import { writeFileSync } from 'node:fs';

const marker = process.env.COMMENT_MARKER || '<!-- pr-lighthouse-results -->';
const manifestRaw = process.env.LIGHTHOUSE_MANIFEST?.trim() || '[]';
const linksRaw = process.env.LIGHTHOUSE_LINKS?.trim() || '{}';
const commentBodyFile = process.env.COMMENT_BODY_FILE || 'lighthouse-pr-comment.md';

let manifest = [];
let links = {};

try {
  manifest = JSON.parse(manifestRaw);
} catch {
  manifest = [];
}

try {
  links = JSON.parse(linksRaw);
} catch {
  links = {};
}

const toPercent = (score) =>
  typeof score === 'number' ? `${Math.round(score * 100)}%` : 'n/a';

const lines = [
  marker,
  '### Lighthouse results',
  '',
  '| URL | Performance | Accessibility | Best Practices | SEO |',
  '| --- | ---: | ---: | ---: | ---: |',
];

if (manifest.length === 0) {
  lines.push('| _No Lighthouse summary generated_ | n/a | n/a | n/a | n/a |');
} else {
  for (const entry of manifest) {
    const summary = entry.summary || {};
    const url = entry.url || 'unknown';
    const reportUrl = links[url];
    const urlCell = reportUrl ? `[${url}](${reportUrl})` : `\`${url}\``;

    lines.push(
      `| ${urlCell} | ${toPercent(summary.performance)} | ${toPercent(summary.accessibility)} | ${toPercent(summary['best-practices'])} | ${toPercent(summary.seo)} |`,
    );
  }
}

lines.push('');
lines.push('_Updated automatically by CI._');

writeFileSync(commentBodyFile, `${lines.join('\n')}\n`);
