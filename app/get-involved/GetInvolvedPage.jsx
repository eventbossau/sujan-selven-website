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
import { TextLink } from '@/components/core/TextLink.jsx';
import { KIT } from '@/lib/data';
import { draft } from '@/lib/copy';
import { LINKS } from '@/lib/links';
import { useGo } from '@/components/kit/Shared.jsx';

export default function GetInvolvedPage() {
  const go = useGo();
  const copy = draft.getInvolved;
  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

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
      languages: String(f.get('languages') || '').trim(),
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
        lead={copy.heroLead}
        image={{ ...KIT.PHOTOS.getInvolved, alt: copy.photoAlt }}
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
          {KIT.getInvolvedActions.map((a) => {
            const href = a.external || a.href || '/' + a.route;
            const onClick = a.route
              ? (e) => {
                  e.preventDefault();
                  go(a.route);
                }
              : undefined;
            return (
              <li key={a.t}>
                <a
                  href={href}
                  onClick={onClick}
                  className="kit-action"
                  {...(a.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <Icon name={a.icon} size={28} />
                  <span className="ss-display-xs">{a.t}</span>
                  <span className="ss-small" style={{ color: 'var(--text-body)' }}>
                    {a.d}
                  </span>
                  <Icon name="arrow-right" size={20} className="kit-action__arrow" />
                </a>
              </li>
            );
          })}
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
              intro={copy.formIntro}
            />
            <SocialLinks
              labelled
              links={KIT.socials.slice(0, 3).map((s) => ({
                ...s,
                label: s.label || s.network,
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
              <p className="ss-lead">{copy.thankYou}</p>
              <Button variant="secondary" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          ) : (
            <form
              id="updates"
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
                options={KIT.HELP_OPTIONS}
                error={errors.help}
              />
              <TextField
                name="languages"
                label="Languages you speak"
                optional
                hint="Helps us match volunteers to the people we meet at the door."
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
                {sending ? 'Sending…' : 'Count me in'}
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
      <section className="ss-section">
        <div
          className="ss-container"
          style={{
            display: 'grid',
            gap: 20,
            maxWidth: 720,
            borderTop: '6px solid var(--green-500)',
            paddingTop: 32,
          }}
        >
          <h2 className="ss-display-s">{copy.electionHeading}</h2>
          <p className="ss-lead">
            {copy.electionText}{' '}
            <TextLink href={LINKS.enrol} external arrow={false}>
              elections.nsw.gov.au
            </TextLink>
            .
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Button
              href={LINKS.joinGreens}
              icon="arrow-up-right"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the Greens
            </Button>
            <Button
              href={LINKS.donate}
              variant="secondary"
              icon="arrow-up-right"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chip in
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
