'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/core/Button.jsx';
import { Icon } from '@/components/core/Icon.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { NewsCard } from '@/components/cards/NewsCard.jsx';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder.jsx';
import { KIT } from '@/lib/data';

export function toHref(route) {
  const key = String(route).replace(/^\//, '').replace(/^$/, 'home');
  if (key === 'home') return '/';
  return '/' + key;
}

export function linkTo(go, route) {
  return {
    href: toHref(route),
    onClick: (e) => {
      e.preventDefault();
      go(route);
    },
  };
}

export function useGo() {
  const router = useRouter();
  return React.useCallback(
    (route) => {
      router.push(toHref(route));
      window.scrollTo(0, 0);
    },
    [router],
  );
}

export function Reveal({ children, as = 'div', className = '', ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-in');
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    const t = setTimeout(() => el.classList.add('is-in'), 1200);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  const T = as;
  return (
    <T ref={ref} className={'ss-reveal ' + className} {...rest}>
      {children}
    </T>
  );
}

export function ContactStrip({ go }) {
  return (
    <section className="ss-section--sm" style={{ background: 'var(--surface-subtle)' }}>
      <div
        className="ss-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px 48px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'grid', gap: 10, maxWidth: 640 }}>
          <h2 className="ss-display-s">Got something on your mind?</h2>
          <p className="ss-body" style={{ color: 'var(--text-body)' }}>
            Whether it’s a local issue, an idea or a question, Sujan wants to hear from you.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="secondary" {...linkTo(go, 'contact')}>
            Contact Sujan
          </Button>
          <TextLink href="mailto:[email]" icon="mail" arrow={false}>
            [email@domain]
          </TextLink>
        </div>
      </div>
    </section>
  );
}

export function EventRow({ ev }) {
  return (
    <li
      style={{
        display: 'grid',
        gridTemplateColumns: '84px minmax(0,1fr) auto',
        gap: '8px 24px',
        alignItems: 'center',
        padding: '20px 0',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div style={{ display: 'grid', justifyItems: 'start', lineHeight: 1 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--green-700)' }}>
          {ev.d}
        </span>
        <span className="ss-overline" style={{ color: 'var(--ink)' }}>
          {ev.m}
        </span>
      </div>
      <div style={{ display: 'grid', gap: 6, minWidth: 0 }}>
        <h3 className="ss-h4">{ev.title}</h3>
        <p className="ss-meta" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <Icon name="map-pin" size={15} />
            {ev.where}
          </span>
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
            <Icon name="clock" size={15} />
            {ev.time}
          </span>
        </p>
      </div>
      <TextLink href="#">RSVP</TextLink>
    </li>
  );
}

export function NewsGridCard({ item, go, layout }) {
  return (
    <NewsCard
      layout={layout}
      image={item.image}
      media={item.image ? null : <ImagePlaceholder label={item.ph} ratio="3/2" />}
      category={item.category}
      categoryTone={KIT.catTone[item.category]}
      date={item.date}
      title={item.title}
      excerpt={item.excerpt}
      {...linkTo(go, 'news/article')}
    />
  );
}
