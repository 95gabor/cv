import { InlineLink } from '@/components/ui/inline-link';
import { SectionTitle } from '@/components/ui/section-title';
import type { Education as EducationType, Locale } from '@/lib/cv/types';
import { uiMessages } from '@/lib/ui-messages';
import { formatPeriodDate, toDateTime } from '@/lib/period';

type EducationProps = {
  educations: EducationType[];
  locale: Locale;
};

function formatEducationPeriod(
  from: EducationType['from'],
  end?: EducationType['end'],
) {
  const fromLabel = formatPeriodDate(from);
  return end ? `${fromLabel} – ${formatPeriodDate(end)}` : fromLabel;
}

export function Education({ educations, locale }: EducationProps) {
  const messages = uiMessages(locale);

  return (
    <section className="text-center" data-testid="education-section">
      <SectionTitle id="education" accent label={messages.cv.education} />
      <div role="list" data-testid="education-list">
        {educations.map((edu, idx) => (
          <article
            key={`${edu.degree.en}-${idx}`}
            className="cv-entry text-center print:break-inside-avoid"
            role="listitem"
            itemScope
            itemType="https://schema.org/EducationalOccupationalCredential"
            data-testid={`education-item-${idx}`}
          >
            <h3
              className="text-lg font-semibold text-foreground sm:text-xl"
              itemProp="name"
            >
              {edu.degree[locale]}
            </h3>
            <div className="cv-meta">
              <time dateTime={toDateTime(edu.from)} itemProp="dateCreated">
                {formatEducationPeriod(edu.from, edu.end)}
              </time>
              <span className="hidden text-border sm:inline" aria-hidden="true">
                ·
              </span>
              <span
                itemProp="recognizedBy"
                itemScope
                itemType="https://schema.org/EducationalOrganization"
              >
                <span itemProp="name">
                  <InlineLink href={edu.institution.link}>
                    <strong>{edu.institution.name[locale]}</strong>
                  </InlineLink>
                </span>
              </span>
              <span className="hidden text-border sm:inline" aria-hidden="true">
                ·
              </span>
              <span itemProp="credentialCategory">{edu.location}</span>
            </div>
            {edu.note ? (
              <p className="cv-body" itemProp="description">
                {edu.note[locale]}
              </p>
            ) : null}
            <meta itemProp="dateCreated" content={toDateTime(edu.from)} />
            {edu.end ? (
              <meta itemProp="dateModified" content={toDateTime(edu.end)} />
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
