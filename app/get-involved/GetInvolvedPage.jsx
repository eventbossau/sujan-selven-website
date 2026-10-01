'use client';

import React from 'react';
import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { Icon } from '@/components/core/Icon.jsx';
import { TextField } from '@/components/forms/TextField.jsx';
import { Select } from '@/components/forms/Select.jsx';
import { Checkbox } from '@/components/forms/Checkbox.jsx';
import { Button } from '@/components/core/Button.jsx';
import { SocialLinks } from '@/components/core/SocialLinks.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { KIT } from '@/lib/data';
import { linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function GetInvolvedPage() {
  const go = useGo();
  const [sent, setSent] = React.useState(false);
  const actions = [
    { icon: 'users', t: 'Volunteer', d: 'Doorknock, help at events or lend a skill.', href: '#volunteer' },
    { icon: 'calendar', t: 'Attend an event', d: 'Meet Sujan and your neighbours.', route: 'community' },
    { icon: 'mail', t: 'Stay updated', d: 'Occasional news, straight to your inbox.', href: '#volunteer' },
    { icon: 'send', t: 'Contact the team', d: 'Questions, ideas or a local issue.', route: 'contact' },
  ];
  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Get Involved' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        overline="Get involved"
        title={
          <>
            Be part of <em>it</em>
          </>
        }
        lead="People make this campaign. Pick what suits you — every bit helps."
        image={{
          src: KIT.P + 'portrait-shirt-07.jpg',
          alt: 'Sujan Selven',
          position: '50% 28%',
        }}
      />
      <section className="ss-section--sm">
        <ul
          className="ss-container"
          style={{
            listStyle: 'none',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
            gap: 16,
          }}
        >
          {actions.map((a) => (
            <li key={a.t}>
              <a
                href={a.href || '/' + a.route}
                onClick={
                  a.route
                    ? (e) => {
                        e.preventDefault();
                        go(a.route);
                      }
                    : undefined
                }
                className="kit-action"
              >
                <Icon name={a.icon} size={28} />
                <span className="ss-display-xs">{a.t}</span>
                <span className="ss-small" style={{ color: 'var(--text-body)' }}>
                  {a.d}
                </span>
                <Icon name="arrow-right" size={20} className="kit-action__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="ss-section" id="volunteer" style={{ background: 'var(--surface-subtle)' }}>
        <div
          className="ss-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: 'clamp(32px,6vw,96px)',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'grid', gap: 24 }}>
            <SectionHeading
              overline="Sign up"
              title="Volunteer or stay in touch"
              intro="Tell us a little about yourself and how you’d like to help. We’ll be in touch."
            />
            <SocialLinks
              labelled
              links={KIT.socials.slice(0, 3).map((s) => ({
                ...s,
                label: s.network[0].toUpperCase() + s.network.slice(1),
              }))}
            />
          </div>
          {sent ? (
            <div
              role="status"
              style={{
                background: 'var(--white)',
                padding: 40,
                borderTop: '6px solid var(--green-500)',
                display: 'grid',
                gap: 16,
              }}
            >
              <h3 className="ss-display-s">Thank you</h3>
              <p className="ss-lead">
                We’ve got your details and someone from the team will be in touch soon.
              </p>
              <Button variant="secondary" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              style={{
                background: 'var(--white)',
                padding: 'clamp(24px,3vw,40px)',
                display: 'grid',
                gap: 20,
              }}
            >
              <div className="kit-2col">
                <TextField label="First name" required autoComplete="given-name" />
                <TextField label="Last name" required autoComplete="family-name" />
              </div>
              <TextField label="Email" type="email" required autoComplete="email" />
              <div className="kit-2col">
                <TextField label="Mobile" type="tel" autoComplete="tel" hint="Optional" />
                <TextField label="Postcode" inputMode="numeric" required />
              </div>
              <Select
                label="How would you like to help?"
                options={[
                  'Volunteer at events',
                  'Doorknocking',
                  'Phone calls',
                  'Share a skill',
                  'Just keep me updated',
                ]}
              />
              <Checkbox
                id="gi-updates"
                label="Send me occasional email updates"
                hint="Unsubscribe any time."
                defaultChecked
              />
              <Button type="submit" size="lg" icon="arrow-right">
                Sign up
              </Button>
              <p className="ss-meta">[Privacy statement — approved wording to be supplied.]</p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
