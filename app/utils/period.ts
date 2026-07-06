import type { PeriodDate } from '~/types/cv';

const padMonth = (month: number) => String(month).padStart(2, '0');

export const formatPeriodDate = (date: PeriodDate): string => {
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
};

export const formatPeriod = (
  from: PeriodDate,
  end: PeriodDate | undefined,
  presentLabel: string,
): string => {
  const fromLabel = formatPeriodDate(from);

  if (!end) {
    return `${fromLabel} - ${presentLabel}`;
  }

  return `${fromLabel} - ${formatPeriodDate(end)}`;
};

export const toDateTime = (date: PeriodDate): string => formatPeriodDate(date);

export const toIsoDate = (date: PeriodDate): string | undefined => {
  const { year, month } = date;

  if (year !== undefined && month !== undefined) {
    return `${year}-${padMonth(month)}-01`;
  }

  if (year !== undefined) {
    return `${year}-01-01`;
  }

  return undefined;
};
