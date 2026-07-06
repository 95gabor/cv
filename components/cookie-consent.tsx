'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [hasConsent, setHasConsent] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage only available after mount
      setHasConsent(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setHasConsent(true);
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setHasConsent(true);
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.('consent', 'update', { analytics_storage: 'denied' });
  };

  if (hasConsent) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/50 bg-card/95 p-4 backdrop-blur-md print:hidden"
      role="region"
      aria-label="Cookie consent"
      data-testid="cookie-banner"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="min-w-[300px] flex-1 text-sm text-foreground" data-testid="cookie-message">
          This website uses cookies to analyze site traffic and improve your
          experience. By continuing to use this site, you agree to our use of
          cookies.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button data-testid="cookie-accept" onClick={acceptCookies}>
            Accept
          </Button>
          <Button variant="outline" data-testid="cookie-decline" onClick={declineCookies}>
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
