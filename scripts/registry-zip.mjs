import { deflateRawSync, inflateRawSync } from "node:zlib";
const crcTable = Array.from({ length: 256 }, (_, n) => {
  for (let i = 0; i < 8; i++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
function crc32(bytes) {
  let n = 0xffffffff;
  for (const b of bytes) n = crcTable[(n ^ b) & 255] ^ (n >>> 8);
  return (n ^ 0xffffffff) >>> 0;
}
// Deterministic classic ZIP, UTF-8 names, deflate payloads. No source executes.
export function zipEntries(entries) {
  const locals = [],
    central = [];
  let offset = 0;
  for (const [path, data] of entries) {
    const name = Buffer.from(path),
      bytes = Buffer.from(data),
      packed = deflateRawSync(bytes),
      crc = crc32(bytes),
      local = Buffer.alloc(30),
      header = Buffer.alloc(46);
    local.writeUInt32LE(0x04034b50);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(33, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(packed.length, 18);
    local.writeUInt32LE(bytes.length, 22);
    local.writeUInt16LE(name.length, 26);
    header.writeUInt32LE(0x02014b50);
    header.writeUInt16LE(20, 4);
    header.writeUInt16LE(20, 6);
    header.writeUInt16LE(0x800, 8);
    header.writeUInt16LE(8, 10);
    header.writeUInt16LE(33, 14);
    header.writeUInt32LE(crc, 16);
    header.writeUInt32LE(packed.length, 20);
    header.writeUInt32LE(bytes.length, 24);
    header.writeUInt16LE(name.length, 28);
    header.writeUInt32LE(offset, 42);
    locals.push(local, name, packed);
    central.push(header, name);
    offset += local.length + name.length + packed.length;
  }
  const directory = Buffer.concat(central),
    end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(directory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, directory, end]);
}
export function unzipEntries(zip) {
  let end = zip.length - 22;
  while (end >= 0 && zip.readUInt32LE(end) !== 0x06054b50) end--;
  if (end < 0) throw Error("Missing ZIP directory");
  let offset = zip.readUInt32LE(end + 16);
  const entries = new Map();
  for (let i = 0; i < zip.readUInt16LE(end + 10); i++) {
    if (zip.readUInt32LE(offset) !== 0x02014b50)
      throw Error("Invalid ZIP directory");
    const size = zip.readUInt32LE(offset + 20),
      method = zip.readUInt16LE(offset + 10),
      nameLength = zip.readUInt16LE(offset + 28),
      name = zip.subarray(offset + 46, offset + 46 + nameLength).toString(),
      local = zip.readUInt32LE(offset + 42),
      start =
        local +
        30 +
        zip.readUInt16LE(local + 26) +
        zip.readUInt16LE(local + 28),
      packed = zip.subarray(start, start + size),
      bytes =
        method === 8 ? inflateRawSync(packed) : method === 0 ? packed : null;
    if (!bytes || crc32(bytes) !== zip.readUInt32LE(offset + 16))
      throw Error("Corrupt ZIP entry");
    entries.set(name, bytes);
    offset +=
      46 +
      nameLength +
      zip.readUInt16LE(offset + 30) +
      zip.readUInt16LE(offset + 32);
  }
  return entries;
}
