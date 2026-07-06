import { SetDocumentLang } from '@/components/set-document-lang';
import { LocaleProvider } from '@/components/locale-provider';

export default async function HungarianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LocaleProvider locale="hu">
      <SetDocumentLang lang="hu" />
      {children}
    </LocaleProvider>
  );
}
