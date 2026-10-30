import './embedded-tool.css';
if (new URLSearchParams(location.search).get('embedded') === '1') {
  document.documentElement.dataset.embeddedTool = 'true';
}
