import { zodToJsonSchema } from 'zod-to-json-schema';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { CVSchema } from '../app/types/cv.ts';

const jsonSchema = zodToJsonSchema(CVSchema);
await writeFile(resolve(import.meta.dirname, '../schema/cv.schema.json'), JSON.stringify(jsonSchema, null, 2));

console.log('done.');
