import { StructuredData } from '@/components/structured-data';
import { CookieConsent } from '@/components/cookie-consent';
import { Education } from '@/components/education';
import { Experience } from '@/components/experience';
import { Header } from '@/components/header';
import { Hobbies } from '@/components/hobbies';
import { PageControls } from '@/components/page-controls';
import { Skills } from '@/components/skills';
import type { CV, Locale } from '@/lib/cv/types';

type CvPageProps = {
  cv: CV;
  locale: Locale;
};

export function CvPage({ cv, locale }: CvPageProps) {
  return (
    <div className="cv-shell" data-testid="cv-app">
      <StructuredData cv={cv} locale={locale} />
      <div className="grid-background" aria-hidden="true" />

      <div className="cv-container">
        <div className="cv-content">
          <header className="relative z-10" role="banner" data-testid="cv-header-wrapper">
            <Header personal={cv.personal} locale={locale} />
          </header>

          <main className="cv-panel print:mt-0 print:border-0" role="main" data-testid="cv-main">
            <div className="cv-panel-inner">
              <article
                lang={locale}
                itemScope
                itemType="https://schema.org/Person"
                data-testid="cv-article"
              >
                <PageControls />

                <section
                  className="cv-section cv-panel-lead"
                  aria-labelledby="work-experience"
                  data-testid="section-work-experience"
                >
                  <Experience experiences={cv.workExperience} locale={locale} />
                </section>

                <section
                  className="cv-section"
                  aria-labelledby="education"
                  data-testid="section-education"
                >
                  <Education educations={cv.educations} locale={locale} />
                </section>

                <section
                  className="cv-section"
                  aria-labelledby="skills"
                  data-testid="section-skills"
                >
                  <Skills skills={cv.skills} locale={locale} />
                </section>

                <section
                  className="cv-section"
                  aria-labelledby="hobbies"
                  data-testid="section-hobbies"
                >
                  <Hobbies hobbies={cv.hobbies} locale={locale} />
                </section>
              </article>
            </div>
          </main>
        </div>
      </div>

      <CookieConsent />
    </div>
  );
}
