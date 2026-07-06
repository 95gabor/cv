import { cn } from '@/lib/utils';

type SectionTitleProps = {
  id: string;
  label: string;
  href?: string;
  prefix?: string;
  accent?: boolean;
};

export function SectionTitle({
  id,
  label,
  href,
  prefix = '',
  accent = false,
}: SectionTitleProps) {
  return (
    <h2
      id={id}
      className={cn(
        'section-title mb-6 text-center text-xl font-bold tracking-[0.18em] uppercase sm:mb-7 sm:text-2xl',
        accent ? 'text-primary' : 'text-foreground',
      )}
    >
      <a
        href={href ?? `#${id}`}
        className="no-underline transition-colors hover:text-primary/80"
      >
        {prefix}
        {label}
      </a>
    </h2>
  );
}
