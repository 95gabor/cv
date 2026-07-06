import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { getCvProfile } from '../lib/cv/fetch';
import { buildLlmsTxt } from '../lib/seo/llms-content';
import { siteConfig } from '../lib/site-config';

async function main() {
  const cv = await getCvProfile(siteConfig.cv.slug, 'en');
  const content = buildLlmsTxt(cv, siteConfig);
  const outputPath = resolve(process.cwd(), 'public/llms.txt');

  await writeFile(outputPath, content, 'utf8');
  console.info(`[llms] wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
