# Content model

CV data schema, localization, and validation rules.

## Schema source

| File                    | Role                                             |
| ----------------------- | ------------------------------------------------ |
| `app/types/cv.ts`       | **Source of truth** — Zod definitions            |
| `content.config.ts`     | Wires `CVSchema` into `@nuxt/content` collection |
| `schema/cv.schema.json` | Generated JSON Schema (do not edit manually)     |
| `content/example.yaml`  | Reference document with all field types          |

## Top-level shape

```typescript
{
  personal: Personal,
  workExperience: WorkExperience[],
  educations: Education[],
  skills: Skill[],
  hobbies: Hobby[],
}
```

## Localization

Type: `Record<'en' | 'hu', string>` for user-facing text fields.

| Layer      | Location              | Example                                        |
| ---------- | --------------------- | ---------------------------------------------- |
| CV content | `content/*.yaml`      | `title.en`, `title.hu`                         |
| UI chrome  | `i18n/locales/*.json` | `cv.workExperience`, `experience.technologies` |

Language routing: `prefix_except_default` — English at `/`, Hungarian at `/hu`.

## Field reference

### `personal`

| Field           | Type                                   | Notes                |
| --------------- | -------------------------------------- | -------------------- |
| `name`, `title` | LocalizedString                        | Required both langs  |
| `picture`       | string                                 | Path under `public/` |
| `links[]`       | platform, url, icon.dark/light         | Social icons         |
| `contact[]`     | type: location/phone/email/link, value | Header contact row   |

### `workExperience[]`

| Field            | Type                | Notes                                        |
| ---------------- | ------------------- | -------------------------------------------- |
| `title`          | LocalizedString     | Job title                                    |
| `company`        | `{ name, link? }`   | Company name + optional URL                  |
| `employmentType` | string?             | i18n key under `experience.employmentType.*` |
| `location`       | string              | City / region                                |
| `from`           | `{ year, month? }`  | Start date                                   |
| `end`            | `{ year, month? }`? | Omit = current position                      |
| `description`    | LocalizedString     | Supports `>` folded blocks                   |
| `technologies[]` | `{ name, link }`    | Both required in schema                      |

### `educations[]`

| Field         | Type              | Notes                   |
| ------------- | ----------------- | ----------------------- |
| `degree`      | LocalizedString   |                         |
| `institution` | `{ name, link? }` |                         |
| `location`    | string            |                         |
| `from`, `end` | PeriodDate        | Same as work experience |
| `note`        | LocalizedString?  | Optional footnote       |

### `skills[]` / `hobbies[]`

| Field  | Type                                         |
| ------ | -------------------------------------------- |
| `name` | string (skills) or LocalizedString (hobbies) |
| `link` | string?                                      |

> **Note:** `skills[].name` is a plain string in the schema; `hobbies[].name` is
> localized.

## Period dates

```yaml
from:
  year: 2021
  month: 3 # optional, 1–12
end:
  year: 2024 # omit entire `end` for ongoing
```

Rendered via `~/utils/period` (`formatPeriod`, `toDateTime`).

## Content loading

```typescript
// app/app.vue
queryCollection('cv').where('stem', '=', 'gabor-pichner').first();
```

The `stem` matches the YAML filename without extension. `config.ts` →
`cv.filename` documents the intended file but the query is currently hardcoded
to `gabor-pichner` — align both when switching CV files.

## Validation errors

Common Zod failures:

- Missing `en` or `hu` on localized fields
- `technologies[].link` missing (required in schema)
- Invalid `contact.type` enum value
- `month` outside 1–12

Fix YAML, then `npm run generate` to verify.

## Adding schema fields

1. Update `app/types/cv.ts` (Zod)
2. Update `content/example.yaml` + active CV YAML
3. Update relevant Vue component if new UI needed
4. Run typecheck + generate
5. Update `docs/content.md` if user-facing
