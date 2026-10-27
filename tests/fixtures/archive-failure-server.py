"""Local-only fault fixture. Production source and archive files are unchanged.
Run while the website dev server is on 4250, then use browser tools at 4253.
"""
import http.client
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

failed = set()
faults = {'/design-archive/index.json', '/design-archive/mercury-3172cd4d/design-system.json'}

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path in faults and path not in failed:
            failed.add(path)
            self.send_response(503)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'Intentional local test failure')
            return
        if path == '/unavailable-preview.mp4':
            self.send_error(404, 'Intentional preview failure')
            return
        upstream = http.client.HTTPConnection('127.0.0.1', 4250, timeout=20)
        try:
            upstream.request('GET', self.path, headers={'Host': '127.0.0.1:4250', 'Accept-Encoding': 'identity'})
            response = upstream.getresponse()
            body = response.read()
            if path == '/design-archive/index.json' and response.status == 200:
                entries = json.loads(body)
                for entry in entries:
                    entry['video'] = '/unavailable-preview.mp4'
                body = json.dumps(entries).encode()
            self.send_response(response.status)
            for key, value in response.getheaders():
                if key.lower() not in ('content-length', 'transfer-encoding', 'content-encoding', 'connection'):
                    self.send_header(key, value)
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        finally:
            upstream.close()

    def log_message(self, *_args):
        pass

ThreadingHTTPServer(('127.0.0.1', int(os.environ.get('FIXTURE_PORT', '4253'))), Handler).serve_forever()
