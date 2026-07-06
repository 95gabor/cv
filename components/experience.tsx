import { Badge } from '@/components/ui/badge';
import { InlineLink } from '@/components/ui/inline-link';
import { SectionTitle } from '@/components/ui/section-title';
import type { Locale, WorkExperience } from '@/lib/cv/types';
import { uiMessages } from '@/lib/ui-messages';
import { formatPeriod, toDateTime } from '@/lib/period';

type ExperienceProps = {
  experiences: WorkExperience[];
  locale: Locale;
};

function MetaSeparator() {
  return <span className="hidden text-border sm:inline" aria-hidden="true">·</span>;
}

export function Experience({ experiences, locale }: ExperienceProps) {
  const messages = uiMessages(locale);
  const presentLabel = messages.experience.present;
  const technologiesLabel = messages.experience.technologies;
  const employmentTypeLabels = messages.experience.employmentType;

  return (
    <section data-testid="experience-section">
      <SectionTitle
        id="work-experience"
        accent
        label={messages.cv.workExperience}
      />
      <div data-testid="experience-card">
        <div role="list" data-testid="experience-list">
          {experiences.map((job, idx) => (
            <article
              key={`${job.company.name}-${job.from.year}-${idx}`}
              className="cv-entry print:break-inside-avoid"
              role="listitem"
              itemScope
              itemType="https://schema.org/JobPosting"
              data-testid={`experience-item-${idx}`}
            >
              <header className="space-y-2.5 text-center sm:space-y-3">
                <h3
                  className="text-lg font-semibold text-foreground sm:text-xl"
                  itemProp="title"
                  data-testid={`experience-item-title-${idx}`}
                >
                  {job.title[locale]}
                </h3>
                <div className="cv-meta">
                  <time dateTime={toDateTime(job.from)} itemProp="datePosted">
                    {formatPeriod(job.from, job.end, presentLabel)}
                  </time>
                  <MetaSeparator />
                  <span
                    itemProp="hiringOrganization"
                    itemScope
                    itemType="https://schema.org/Organization"
                  >
                    {job.company.link ? (
                      <InlineLink href={job.company.link} itemProp="url">
                        <strong itemProp="name">{job.company.name}</strong>
                      </InlineLink>
                    ) : (
                      <strong itemProp="name">{job.company.name}</strong>
                    )}
                  </span>
                  {job.employmentType ? (
                    <>
                      <MetaSeparator />
                      <span>
                        {
                          employmentTypeLabels[
                            job.employmentType as keyof typeof employmentTypeLabels
                          ]
                        }
                      </span>
                    </>
                  ) : null}
                  <MetaSeparator />
                  <span
                    itemProp="jobLocation"
                    itemScope
                    itemType="https://schema.org/Place"
                  >
                    <span itemProp="addressLocality">{job.location}</span>
                  </span>
                </div>
              </header>

              <div
                className="cv-body text-center sm:text-left"
                itemProp="description"
              >
                <p>{job.description[locale]}</p>
              </div>

              <div>
                <p className="cv-label text-center">{technologiesLabel}</p>
                <ul
                  className="flex flex-wrap justify-center gap-2"
                  role="list"
                  data-testid={`experience-item-tech-list-${idx}`}
                >
                  {job.technologies.map((tech) => (
                    <li key={tech.name} role="listitem">
                      <Badge
                        variant="outline"
                        className="justify-center border-border/80 bg-secondary/50 px-2.5 py-1 text-center text-xs font-normal text-secondary-foreground"
                        asChild={!!tech.link}
                      >
                        {tech.link ? (
                          <a href={tech.link} target="_blank" rel="noopener">
                            <span itemProp="skill">{tech.name}</span>
                          </a>
                        ) : (
                          <span itemProp="skill">{tech.name}</span>
                        )}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
