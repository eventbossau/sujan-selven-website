'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { SplitSection } from '@/components/content/SplitSection.jsx';
import { QuoteBlock } from '@/components/cards/QuoteBlock.jsx';
import { PhotoBand } from '@/components/content/PhotoBand.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { Button } from '@/components/core/Button.jsx';
import { GreensMark } from '@/components/brand/GreensMark.jsx';
import { KIT } from '@/lib/data';
import { draft } from '@/lib/copy';
import { linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function AboutPage() {
  const go = useGo();
  const K = KIT;
  const copy = draft.about;
  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'About' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        title={
          <>
            Grounded in <em>Western Sydney</em>
          </>
        }
        lead={copy.heroLead}
        image={K.PHOTOS.aboutHero}
      />
      <section className="ss-section">
        <div className="ss-container ss-container--narrow">
          <div className="ss-about-block">
            <h2 className="ss-display-s">My story</h2>
            {copy.myStory.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="ss-about-block">
            <h2 className="ss-display-s">Background</h2>
            {copy.background.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
          <div className="ss-about-block">
            <h2 className="ss-display-s">Experience</h2>
            {copy.experience.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <PhotoBand
        src={K.PHOTOS.aboutBand.src}
        alt={K.PHOTOS.aboutBand.alt}
        position={K.PHOTOS.aboutBand.position}
        statement={
          <>
            People over <em>politics</em>
          </>
        }
      />
      <section className="ss-section">
        <div className="ss-container">
          <SplitSection
            imageSide="right"
            image={K.PHOTOS.aboutCommunity}
            overline="In the community"
            title={copy.communityHeadline}
          >
            {copy.communityBody.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </SplitSection>
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div className="ss-container">
          <SectionHeading
            overline="Milestones"
            title="Along the way"
            intro="Twelve years, three levels of government, and a council seat won in 2024."
          />
          <ol
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))',
              gap: 24,
            }}
          >
            {K.milestones.map((m) => (
              <li
                key={m.year + m.title}
                style={{
                  borderTop: '4px solid var(--ink)',
                  paddingTop: 16,
                  display: 'grid',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 40,
                    lineHeight: 1,
                    color: 'var(--green-700)',
                  }}
                >
                  {m.year}
                </span>
                <span className="ss-h4">{m.title}</span>
                <span className="ss-small" style={{ color: 'var(--text-body)' }}>
                  {m.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="ss-section">
        <div className="ss-container">
          <QuoteBlock variant="feature" quote={copy.quote} name="Sujan Selven" />
        </div>
      </section>
      <section className="ss-section" style={{ paddingTop: 0 }}>
        <div
          className="ss-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--border-default)',
            paddingTop: 40,
          }}
        >
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <GreensMark height={64} />
            <p className="ss-small" style={{ maxWidth: '44ch' }}>
              {copy.greensLine}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Button {...linkTo(go, 'priorities')} icon="arrow-right">
              My priorities
            </Button>
            <Button variant="secondary" {...linkTo(go, 'community')}>
              Community work
            </Button>
          </div>
        </div>
        <div className="ss-container" style={{ marginTop: 32 }}>
          <p className="ss-meta">{copy.closingLine}</p>
        </div>
      </section>
    </>
  );
}
