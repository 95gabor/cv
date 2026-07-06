import { getTranslations } from 'next-intl/server';

import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/ui/section-title';
import type { Locale, Skill } from '@/lib/cv/types';

type SkillsProps = {
  skills: Skill[];
  locale: Locale;
};

export async function Skills({ skills, locale }: SkillsProps) {
  void locale;
  const t = await getTranslations('cv');
  const midpoint = Math.ceil(skills.length / 2);
  const columns = [skills.slice(0, midpoint), skills.slice(midpoint)];

  return (
    <section data-testid="skills-section">
      <SectionTitle id="skills" accent label={t('skills')} />
      <div
        className="grid gap-2.5 sm:grid-cols-2 sm:gap-3"
        data-testid="skills-grid"
      >
        {columns.map((column, colIdx) => (
          <ul
            key={colIdx === 0 ? 'skills-col-a' : 'skills-col-b'}
            className="m-0 list-none space-y-2.5 p-0"
            role="list"
            itemScope
            itemType="https://schema.org/ItemList"
            data-testid={colIdx === 0 ? 'skills-list' : undefined}
          >
            {column.map((skill, index) => {
              const position = colIdx * midpoint + index + 1;
              return (
                <li
                  key={skill.name}
                  role="listitem"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  data-testid={`skill-item-${position - 1}`}
                >
                  <Badge
                    variant="secondary"
                    className="h-auto w-full justify-center whitespace-normal rounded-lg px-3.5 py-3 text-center text-sm font-normal leading-snug"
                    asChild={!!skill.link}
                  >
                    {skill.link ? (
                      <a
                        href={skill.link}
                        target="_blank"
                        rel="noopener"
                        className="hover:text-primary"
                      >
                        <span itemProp="name">{skill.name}</span>
                      </a>
                    ) : (
                      <span itemProp="name">{skill.name}</span>
                    )}
                  </Badge>
                  <meta itemProp="position" content={String(position)} />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
