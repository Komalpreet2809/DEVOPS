/**
 * Converts captured PowerShell/Docker terminal output into SVG screenshots for GitHub.
 * Usage: node scripts/terminal-to-svg.js <input.txt> <output.svg> [title]
 */
const fs = require('fs');
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3];
const title = process.argv[4] || 'Windows PowerShell — Docker Lab';

if (!inputFile || !outputFile) {
  console.error('Usage: node terminal-to-svg.js <input.txt> <output.svg> [title]');
  process.exit(1);
}

const text = fs.readFileSync(inputFile, 'utf8').replace(/\r\n/g, '\n').trim();
const lines = text.split('\n');
const lineHeight = 18;
const padding = 16;
const width = 920;
const height = padding * 2 + 36 + lines.length * lineHeight;

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const body = lines
  .map((line, i) => {
    const y = padding + 36 + (i + 1) * lineHeight;
    const color = line.startsWith('PS ') ? '#61dafb' : line.includes('Error') ? '#f87171' : '#e2e8f0';
    return `<text x="${padding}" y="${y}" fill="${color}" font-family="Consolas, 'Courier New', monospace" font-size="13">${escapeXml(line || ' ')}</text>`;
  })
  .join('\n');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#0f172a" rx="8"/>
  <rect x="0" y="0" width="${width}" height="32" fill="#1e293b" rx="8"/>
  <circle cx="18" cy="16" r="6" fill="#ef4444"/>
  <circle cx="38" cy="16" r="6" fill="#eab308"/>
  <circle cx="58" cy="16" r="6" fill="#22c55e"/>
  <text x="80" y="20" fill="#94a3b8" font-family="Segoe UI, sans-serif" font-size="12">${escapeXml(title)}</text>
  ${body}
</svg>`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, svg);
console.log(`Created ${outputFile}`);
