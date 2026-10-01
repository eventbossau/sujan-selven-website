'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { SplitSection } from '@/components/content/SplitSection.jsx';
import { QuoteBlock } from '@/components/cards/QuoteBlock.jsx';
import { PhotoBand } from '@/components/content/PhotoBand.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { Button } from '@/components/core/Button.jsx';
import { GreensMark } from '@/components/brand/GreensMark.jsx';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder.jsx';
import { KIT } from '@/lib/data';
import { draft } from '@/lib/copy';
import { linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function AboutPage() {
  const go = useGo();
  const K = KIT;
  const copy = draft.about;
  const milestones = ['[Year]', '[Year]', '[Year]', '[Year]'];
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
            Grounded in <em>Cumberland</em>
          </>
        }
        lead={copy.heroLead}
        image={{
          src: K.P + 'portrait-shirt-05.jpg',
          alt: 'Sujan Selven smiling outdoors',
          position: '50% 25%',
        }}
      />
      <section className="ss-section">
        <div className="ss-container ss-container--narrow">
          <div className="ss-prose" style={{ marginInline: 'auto' }}>
            <p className="ss-prose__lead">{copy.opening}</p>
            <h2>Background</h2>
            <p>{copy.background}</p>
            <h2>Experience</h2>
            <p>{copy.experience}</p>
          </div>
        </div>
      </section>
      <PhotoBand
        src={K.P + 'portrait-blazer-01.jpg'}
        alt="Sujan Selven in a park"
        position="50% 30%"
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
            media={<ImagePlaceholder label="Sujan at a community event — to be supplied" ratio="4/5" />}
            overline="In the community"
            title={copy.communityHeadline}
          >
            <p>{copy.communityBody[0]}</p>
            <p>{copy.communityBody[1]}</p>
          </SplitSection>
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div className="ss-container">
          <SectionHeading overline="Milestones" title="Along the way" />
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
            {milestones.map((y, i) => (
              <li
                key={i}
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
                  {y}
                </span>
                <span className="ss-h4">[Milestone]</span>
                <span className="ss-small" style={{ color: 'var(--text-body)' }}>
                  [One-line description]
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="ss-section">
        <div className="ss-container">
          <QuoteBlock
            variant="feature"
            quote="[Approved quote from Sujan about why the people matter]"
            name="Sujan Selven"
          />
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
              His priorities
            </Button>
            <Button variant="secondary" {...linkTo(go, 'community')}>
              Community work
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
