'use client';

import { Printer } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function PrintButton() {
  const t = useTranslations('print');

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
      data-testid="print-button"
      aria-label={t('ariaLabel')}
    >
      <Printer className="size-4" aria-hidden />
    </button>
  );
}
