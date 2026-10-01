'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { ArticleBody } from '@/components/article/ArticleBody.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { KIT } from '@/lib/data';
import { useGo } from '@/components/kit/Shared.jsx';

export default function PrivacyPage() {
  const go = useGo();
  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Privacy' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        title="Privacy"
        lead="How personal information is handled on this website."
      />
      <section className="ss-section" style={{ paddingTop: 'clamp(32px,4vw,64px)' }}>
        <div className="ss-container ss-container--narrow">
          <ArticleBody>
            <p className="ss-prose__lead">
              This page explains what information may be collected through sujanselven.org and how
              it is used. It is plain-language guidance for visitors and should be reviewed by the
              campaign before launch.
            </p>

            <h2>Who this applies to</h2>
            <p>
              This website is maintained for Sujan Selven’s public and community work in Cumberland
              / Western Sydney, in connection with The Greens NSW.
            </p>

            <h2>What we collect</h2>
            <p>We may collect personal information when you:</p>
            <ul>
              <li>Send a message through the contact form</li>
              <li>Sign up to volunteer or stay updated</li>
              <li>Email or call using the contact details on this site</li>
            </ul>
            <p>
              That information can include your name, email address, phone number, postcode,
              suburb, and the content of your message or enquiry.
            </p>

            <h2>How we use it</h2>
            <p>We use this information to:</p>
            <ul>
              <li>Respond to questions, local issues and media enquiries</li>
              <li>Follow up with volunteers and people who ask to stay updated</li>
              <li>Understand community concerns across Cumberland</li>
            </ul>
            <p>
              We do not sell your personal information. We only share it where needed to run the
              campaign or respond to you (for example, within the campaign team), or where the law
              requires it.
            </p>

            <h2>Emails and updates</h2>
            <p>
              If you opt in to email updates, you can unsubscribe at any time using the link in
              those emails, or by contacting us.
            </p>

            <h2>Website technical data</h2>
            <p>
              Like most websites, hosting and analytics tools may record basic technical details
              such as browser type, pages visited, and approximate location. This helps keep the
              site working and improve it over time.
            </p>

            <h2>Contact about privacy</h2>
            <p>
              For privacy questions or to ask about your information, email{' '}
              <TextLink href={'mailto:' + KIT.contact.email} arrow={false}>
                {KIT.contact.email}
              </TextLink>
              .
            </p>

            <p className="ss-meta">Last updated: October 2026</p>
          </ArticleBody>
        </div>
      </section>
    </>
  );
}
