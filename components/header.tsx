import Image from 'next/image';

import { InlineLink } from '@/components/ui/inline-link';
import type { Contact, Link, Locale, Personal } from '@/lib/cv/types';
import { uiMessages } from '@/lib/ui-messages';

type HeaderProps = {
  personal: Personal;
  locale: Locale;
};

function getContactHref(contact: Contact) {
  switch (contact.type) {
    case 'email':
      return `mailto:${contact.value}`;
    case 'phone':
      return `tel:${contact.value}`;
    case 'link':
      return contact.value;
    case 'location':
      return `https://google.hu/maps/place/${encodeURIComponent(contact.value)}`;
    default:
      return contact.value;
  }
}

function SocialIcon({ link }: { link: Link }) {
  return (
    <>
      <Image
        src={link.icon.light}
        alt={link.platform}
        width={32}
        height={32}
        className="header-social-icon-light size-9 object-contain"
      />
      <Image
        src={link.icon.dark}
        alt=""
        width={32}
        height={32}
        className="header-social-icon-dark size-9 object-contain"
        aria-hidden
      />
    </>
  );
}

function ContactBlock({
  contact,
  label,
  align,
  testId,
}: {
  contact: Contact;
  label: string;
  align: 'left' | 'right';
  testId: string;
}) {
  return (
    <div
      className={align === 'left' ? 'text-right max-sm:text-center' : 'text-left max-sm:text-center'}
      data-testid={testId}
    >
      <p className="cv-label mb-0.5">{label}</p>
      <InlineLink
        href={getContactHref(contact)}
        className="inline-block text-base font-medium text-foreground hover:text-primary print:text-black"
      >
        {contact.value}
      </InlineLink>
    </div>
  );
}

export function Header({ personal, locale }: HeaderProps) {
  const contactLabels = uiMessages(locale).contact;
  const leftContacts = personal.contact.slice(0, 2);
  const rightContacts = personal.contact.slice(2);

  return (
    <header className="cv-header pb-4 text-center sm:pb-6 print:pb-4" data-testid="cv-header">
      <div
        className="mb-6 flex items-center justify-center gap-8"
        data-testid="header-social-links"
      >
        {personal.links.map((link) => (
          <InlineLink
            key={link.platform}
            href={link.url}
            className="rounded-full p-2 transition-colors hover:bg-primary/10"
            aria-label={link.platform}
            data-testid={`social-link-${link.platform.toLowerCase()}`}
          >
            <SocialIcon link={link} />
          </InlineLink>
        ))}
      </div>

      <h1
        className="mb-4 text-3xl font-bold tracking-[0.12em] text-primary uppercase sm:mb-5 sm:text-4xl print:text-black"
        data-testid="header-name"
      >
        {personal.name[locale]}
      </h1>

      <div className="mb-5 flex items-center justify-center gap-4 px-4 sm:mb-6">
        <hr className="hidden flex-1 border-t border-border/60 sm:block" />
        <p
          className="text-base font-medium tracking-[0.12em] text-foreground uppercase sm:text-lg print:text-black"
          data-testid="header-title"
        >
          {personal.title[locale]}
        </p>
        <hr className="hidden flex-1 border-t border-border/60 sm:block" />
      </div>

      <div
        className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-6"
        data-testid="header-contact-row"
      >
        <div
          className="flex flex-col gap-3 max-sm:order-2"
          data-testid="header-contact-left"
        >
          {leftContacts.map((contact, idx) => (
            <ContactBlock
              key={`${contact.type}-${contact.value}`}
              contact={contact}
              label={contactLabels[contact.type]}
              align="left"
              testId={`contact-left-${idx}`}
            />
          ))}
        </div>

        <div className="flex justify-center max-sm:order-1">
          <Image
            src={personal.picture}
            alt={personal.name[locale]}
            title={personal.name[locale]}
            width={200}
            height={200}
            priority
            className="relative z-10 mb-0 size-[168px] rounded-full border-[5px] border-primary object-cover shadow-xl shadow-black/50 ring-4 ring-primary/20 sm:-mb-20 sm:size-[200px] print:mb-0 print:border-0 print:shadow-none"
            data-testid="header-avatar"
          />
        </div>

        <div
          className="flex flex-col gap-3 max-sm:order-3"
          data-testid="header-contact-right"
        >
          {rightContacts.map((contact, idx) => (
            <ContactBlock
              key={`${contact.type}-${contact.value}`}
              contact={contact}
              label={contactLabels[contact.type]}
              align="right"
              testId={`contact-right-${idx}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
