'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { ArticleBody } from '@/components/article/ArticleBody.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { KIT } from '@/lib/data';
import { linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function AccessibilityPage() {
  const go = useGo();
  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Accessibility' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        title="Accessibility"
        lead="This site should work for as many people as possible — including people who use keyboards, screen readers, or need clear contrast."
      />
      <section className="ss-section" style={{ paddingTop: 'clamp(32px,4vw,64px)' }}>
        <div className="ss-container ss-container--narrow" style={{ padding: 0 }}>
          <ArticleBody>
            <p className="ss-prose__lead">
              Accessibility is part of treating people with respect. We aim to make
              sujanselven.org usable, readable, and navigable for everyone in the Cumberland
              community.
            </p>

            <h2>What we aim for</h2>
            <ul>
              <li>Clear language and readable text sizes</li>
              <li>Strong colour contrast for body text and controls</li>
              <li>Keyboard access to main navigation and forms</li>
              <li>Visible focus styles so you can see where you are on the page</li>
              <li>Alternative text on meaningful images; decorative images marked appropriately</li>
              <li>Form labels and error messages that do not rely on colour alone</li>
              <li>Respect for reduced-motion preferences where animations are used</li>
            </ul>

            <h2>Known limits</h2>
            <p>
              Some community photography and content are still being supplied. Where a photo is not
              available yet, a labelled placeholder is shown. We will keep improving content and
              structure as the site develops.
            </p>

            <h2>How to get help</h2>
            <p>
              If you have trouble using any part of this website, or need information in another
              format, please{' '}
              <TextLink {...linkTo(go, 'contact')}>contact the team</TextLink> or email{' '}
              <TextLink href={'mailto:' + KIT.contact.email} arrow={false}>
                {KIT.contact.email}
              </TextLink>
              . Tell us which page you were on and what you were trying to do — that helps us fix it
              faster.
            </p>

            <h2>Standards</h2>
            <p>
              We design with WCAG 2.2 guidance in mind (for example, contrast and focus treatment
              in the site design system). This page is a commitment to keep improving, not a formal
              audit certificate.
            </p>

            <p className="ss-meta">Last updated: October 2026</p>
          </ArticleBody>
        </div>
      </section>
    </>
  );
}
