import type { PeriodDate } from '@/lib/cv/types';

const padMonth = (month: number) => String(month).padStart(2, '0');

export function formatPeriodDate(date: PeriodDate): string {
  const { year, month } = date;

  if (year !== undefined && month !== undefined) {
    return `${year}-${padMonth(month)}`;
  }

  if (year !== undefined) {
    return String(year);
  }

  if (month !== undefined) {
    return padMonth(month);
  }

  return '';
}

export function formatPeriod(
  from: PeriodDate,
  end: PeriodDate | undefined,
  presentLabel: string,
): string {
  const fromLabel = formatPeriodDate(from);

  if (!end) {
    return `${fromLabel} - ${presentLabel}`;
  }

  return `${fromLabel} - ${formatPeriodDate(end)}`;
}

export function toDateTime(date: PeriodDate): string {
  return formatPeriodDate(date);
}

export function toIsoDate(date: PeriodDate): string | undefined {
  const { year, month } = date;

  if (year !== undefined && month !== undefined) {
    return `${year}-${padMonth(month)}-01`;
  }

  if (year !== undefined) {
    return `${year}-01-01`;
  }

  return undefined;
}
