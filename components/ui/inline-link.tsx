import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type InlineLinkProps = {
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<'a'>, 'href' | 'children'> &
  Omit<ComponentProps<'span'>, 'href' | 'children'>;

export function InlineLink({
  href,
  className,
  children,
  target = '_blank',
  rel = 'noopener',
  ...props
}: InlineLinkProps) {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cn(
          'text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline',
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}
