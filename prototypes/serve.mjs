// Tiny static server for the mockups. No dependencies, no build step.
//   node prototypes/serve.mjs   ->   http://localhost:4173
// Exists because browsers block file:// pages from loading theme.css.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, normalize } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

createServer(async (req, res) => {
  const name = req.url === '/' ? '/home.html' : decodeURIComponent(req.url.split('?')[0]);
  const path = join(ROOT, normalize(name).replace(/^(\.\.[/\\])+/, ''));
  const ext = path.slice(path.lastIndexOf('.'));
  try {
    const buf = await readFile(path);
    res.writeHead(200, { 'content-type': TYPES[ext] ?? 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('Not found: ' + name);
  }
}).listen(PORT, () => {
  console.log('Mockups on http://localhost:' + PORT);
});
