import { LanguageSelector } from '@/components/language-selector';
import { PrintButton } from '@/components/print-button';
import { ThemeToggle } from '@/components/theme-toggle';

export function PageControls() {
  return (
    <div
      className="absolute top-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 print:hidden sm:top-8 sm:right-10 sm:left-auto sm:translate-x-0"
      data-testid="page-controls"
    >
      <ThemeToggle />
      <PrintButton />
      <LanguageSelector />
    </div>
  );
}
