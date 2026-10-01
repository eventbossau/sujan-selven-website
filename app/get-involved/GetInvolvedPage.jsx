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
import { useGo } from '@/components/kit/Shared.jsx';

const HELP_OPTIONS = [
  'Volunteer at events',
  'Doorknocking',
  'Phone calls',
  'Share a skill',
  'Just keep me updated',
];

export default function GetInvolvedPage() {
  const go = useGo();
  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const actions = [
    { icon: 'users', t: 'Volunteer', d: 'Doorknock, help at events or lend a skill.', href: '#volunteer' },
    { icon: 'calendar', t: 'Attend an event', d: 'Meet Sujan and your neighbours.', route: 'community' },
    { icon: 'mail', t: 'Stay updated', d: 'Occasional news, straight to your inbox.', href: '#volunteer' },
    { icon: 'send', t: 'Contact the team', d: 'Questions, ideas or a local issue.', route: 'contact' },
  ];

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er = {};
    if (!f.get('firstName')) er.firstName = 'Enter your first name';
    if (!f.get('lastName')) er.lastName = 'Enter your last name';
    if (!/^\S+@\S+\.\S+$/.test(f.get('email') || ''))
      er.email = 'Enter a valid email address, like name@example.com';
    if (!/^\d{4}$/.test(String(f.get('postcode') || '').trim()))
      er.postcode = 'Enter a valid Australian postcode';
    if (!f.get('help')) er.help = 'Choose how you’d like to help';
    setErrors(er);
    setFormError('');
    if (Object.keys(er).length) return;

    const payload = {
      firstName: String(f.get('firstName') || '').trim(),
      lastName: String(f.get('lastName') || '').trim(),
      email: String(f.get('email') || '').trim(),
      mobile: String(f.get('mobile') || '').trim(),
      postcode: String(f.get('postcode') || '').trim(),
      help: String(f.get('help') || ''),
      updates: f.get('updates') === 'on',
      company: String(f.get('company') || ''),
    };

    setSending(true);
    try {
      const res = await fetch('/api/get-involved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSent(true);
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

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
                We’ve got your details and someone from the team will be in touch soon. Check your
                email for a confirmation.
              </p>
              <Button variant="secondary" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={submit}
              style={{
                background: 'var(--white)',
                padding: 'clamp(24px,3vw,40px)',
                display: 'grid',
                gap: 20,
              }}
            >
              <div className="kit-2col">
                <TextField
                  name="firstName"
                  label="First name"
                  required
                  autoComplete="given-name"
                  error={errors.firstName}
                />
                <TextField
                  name="lastName"
                  label="Last name"
                  required
                  autoComplete="family-name"
                  error={errors.lastName}
                />
              </div>
              <TextField
                name="email"
                label="Email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
              />
              <div className="kit-2col">
                <TextField name="mobile" label="Mobile" type="tel" autoComplete="tel" optional />
                <TextField
                  name="postcode"
                  label="Postcode"
                  inputMode="numeric"
                  required
                  autoComplete="postal-code"
                  error={errors.postcode}
                />
              </div>
              <Select
                name="help"
                label="How would you like to help?"
                required
                options={HELP_OPTIONS}
                error={errors.help}
              />
              <Checkbox
                id="gi-updates"
                name="updates"
                label="Send me occasional email updates"
                hint="Unsubscribe any time."
                defaultChecked
              />
              <div className="ss-visually-hidden" aria-hidden="true">
                <label htmlFor="gi-company">Company</label>
                <input id="gi-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {formError && (
                <p className="ss-field__error" role="alert">
                  {formError}
                </p>
              )}
              <Button type="submit" size="lg" icon="arrow-right" disabled={sending}>
                {sending ? 'Sending…' : 'Sign up'}
              </Button>
              <p className="ss-meta">
                We’ll only use your details to follow up about volunteering or updates you asked for.
                Read our{' '}
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    go('privacy');
                  }}
                >
                  privacy page
                </a>{' '}
                for more.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
