import { Badge } from '@/components/ui/badge';
import { SectionTitle } from '@/components/ui/section-title';
import type { Hobby, Locale } from '@/lib/cv/types';
import { uiMessages } from '@/lib/ui-messages';

type HobbiesProps = {
  hobbies: Hobby[];
  locale: Locale;
};

export function Hobbies({ hobbies, locale }: HobbiesProps) {
  const messages = uiMessages(locale);

  return (
    <section className="text-center" data-testid="hobbies-section">
      <SectionTitle id="hobbies" accent label={messages.cv.hobbies} />
      <ul
        className="flex list-none flex-wrap justify-center gap-2.5 p-0 sm:gap-3"
        role="list"
        itemScope
        itemType="https://schema.org/ItemList"
        data-testid="hobbies-list"
      >
        {hobbies.map((hobby, index) => (
          <li
            key={hobby.name.en}
            className="max-w-full"
            role="listitem"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            data-testid={`hobby-item-${index}`}
          >
            <Badge
              variant="outline"
              className="h-auto w-fit max-w-full justify-center whitespace-normal rounded-lg border-primary/30 bg-primary/5 px-3.5 py-2 text-center text-sm leading-snug font-normal text-foreground"
              asChild={!!hobby.link}
            >
              {hobby.link ? (
                <a href={hobby.link} target="_blank" rel="noopener" itemProp="url">
                  <span itemProp="name">{hobby.name[locale]}</span>
                </a>
              ) : (
                <span itemProp="name">{hobby.name[locale]}</span>
              )}
            </Badge>
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
