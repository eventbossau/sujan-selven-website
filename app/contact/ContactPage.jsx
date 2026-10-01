'use client';

import React from 'react';
import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { RadioGroup } from '@/components/forms/RadioGroup.jsx';
import { TextField } from '@/components/forms/TextField.jsx';
import { TextArea } from '@/components/forms/TextArea.jsx';
import { Checkbox } from '@/components/forms/Checkbox.jsx';
import { Button } from '@/components/core/Button.jsx';
import { SocialLinks } from '@/components/core/SocialLinks.jsx';
import { Icon } from '@/components/core/Icon.jsx';
import { KIT } from '@/lib/data';
import { useGo } from '@/components/kit/Shared.jsx';

export default function ContactPage() {
  const go = useGo();
  const [type, setType] = React.useState('general');
  const [errors, setErrors] = React.useState({});
  const [formError, setFormError] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const er = {};
    if (!f.get('name')) er.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.get('email') || ''))
      er.email = 'Enter a valid email address, like name@example.com';
    if (!f.get('message')) er.message = 'Tell us how we can help';
    setErrors(er);
    setFormError('');
    if (Object.keys(er).length) return;

    const payload = {
      type: f.get('type') || type,
      name: String(f.get('name') || '').trim(),
      email: String(f.get('email') || '').trim(),
      phone: String(f.get('phone') || '').trim(),
      suburb: String(f.get('suburb') || '').trim(),
      message: String(f.get('message') || '').trim(),
      updates: f.get('updates') === 'on',
      company: String(f.get('company') || ''),
    };

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
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

  const info = [
    { icon: 'mail', l: 'Email', v: KIT.contact.email, href: 'mailto:' + KIT.contact.email },
    { icon: 'phone', l: 'Phone', v: KIT.contact.phone, href: KIT.contact.phoneHref },
    { icon: 'map-pin', l: 'Office', v: KIT.contact.office },
  ];

  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Contact' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        title={
          <>
            Let’s <em>talk</em>
          </>
        }
        lead="Got a question, an idea or a local issue? Get in touch — every message is read."
      />
      <section className="ss-section" style={{ paddingTop: 'clamp(40px,5vw,72px)' }}>
        <div
          className="ss-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
            gap: 'clamp(40px,7vw,120px)',
            alignItems: 'start',
          }}
        >
          {sent ? (
            <div
              role="status"
              style={{
                gridColumn: 'span 1',
                borderTop: '6px solid var(--green-500)',
                paddingTop: 32,
                display: 'grid',
                gap: 16,
              }}
            >
              <h2 className="ss-display-s">Message sent</h2>
              <p className="ss-lead">
                Thanks for getting in touch. We’ve also emailed you a confirmation.
              </p>
              <div>
                <Button variant="secondary" onClick={() => setSent(false)}>
                  Send another message
                </Button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} style={{ display: 'grid', gap: 24 }}>
              <RadioGroup
                name="type"
                legend="What’s it about?"
                value={type}
                onChange={setType}
                options={[
                  { value: 'general', label: 'General enquiry' },
                  { value: 'issue', label: 'Local issue' },
                  { value: 'volunteer', label: 'Volunteering' },
                  { value: 'media', label: 'Media' },
                ]}
              />
              <TextField
                name="name"
                label="Your name"
                required
                autoComplete="name"
                error={errors.name}
              />
              <div className="kit-2col">
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  error={errors.email}
                />
                <TextField
                  name="phone"
                  label="Phone"
                  type="tel"
                  optional
                  autoComplete="tel"
                />
              </div>
              {type === 'issue' && (
                <TextField
                  name="suburb"
                  label="Suburb"
                  hint="Helps us understand where the issue is"
                />
              )}
              <TextArea
                name="message"
                label="Message"
                required
                rows={7}
                error={errors.message}
              />
              <Checkbox
                id="ct-updates"
                name="updates"
                label="I’d also like occasional email updates"
              />
              <div className="ss-visually-hidden" aria-hidden="true">
                <label htmlFor="ct-company">Company</label>
                <input id="ct-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {formError && (
                <p className="ss-field__error" role="alert">
                  {formError}
                </p>
              )}
              <div>
                <Button type="submit" size="lg" icon="send" disabled={sending}>
                  {sending ? 'Sending…' : 'Send message'}
                </Button>
              </div>
            </form>
          )}
          <aside
            style={{
              display: 'grid',
              gap: 32,
              background: 'var(--surface-subtle)',
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <h2 className="ss-display-xs">Other ways to reach Sujan</h2>
            <dl style={{ margin: 0, display: 'grid', gap: 20 }}>
              {info.map((i) => (
                <div key={i.l} style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 12 }}>
                  <Icon name={i.icon} size={22} style={{ color: 'var(--green-700)' }} />
                  <div>
                    <dt className="ss-overline" style={{ color: 'var(--ink)' }}>
                      {i.l}
                    </dt>
                    <dd style={{ margin: '4px 0 0', fontSize: 'var(--fs-body)' }}>
                      {i.href ? <a href={i.href}>{i.v}</a> : i.v}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div style={{ display: 'grid', gap: 12 }}>
              <p className="ss-overline" style={{ color: 'var(--ink)' }}>
                Follow
              </p>
              <SocialLinks links={KIT.socials.slice(0, 3)} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
