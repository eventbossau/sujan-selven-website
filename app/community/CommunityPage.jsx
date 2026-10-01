'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { StoryCard } from '@/components/cards/StoryCard.jsx';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder.jsx';
import { TriangleImage } from '@/components/brand/TriangleImage.jsx';
import { Button } from '@/components/core/Button.jsx';
import { PhotoBand } from '@/components/content/PhotoBand.jsx';
import { QuoteBlock } from '@/components/cards/QuoteBlock.jsx';
import { Tag } from '@/components/core/Tag.jsx';
import { Icon } from '@/components/core/Icon.jsx';
import { KIT } from '@/lib/data';
import { EventRow, linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function CommunityPage() {
  const go = useGo();
  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Community' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        overline="Community"
        title={
          <>
            Local, <em>in person</em>
          </>
        }
        lead="[Overview of Sujan’s community work across Cumberland — to be supplied.]"
        media={
          <TriangleImage shape="slant" frame="bl" ratio="4/5">
            <ImagePlaceholder label="Sujan with residents — to be supplied" ratio="4/5" />
          </TriangleImage>
        }
      />
      <section className="ss-section">
        <div className="ss-container">
          <SectionHeading overline="Local initiatives" title="What’s happening nearby" />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12,minmax(0,1fr))',
              gap: 'clamp(20px,3vw,40px)',
            }}
          >
            <div style={{ gridColumn: 'span 12' }} className="kit-feature-story">
              <StoryCard
                place={KIT.stories[0].place}
                kicker="[Initiative type]"
                title={KIT.stories[0].title}
                text={KIT.stories[0].text}
                ratio="16/9"
                shape="corner"
                media={<ImagePlaceholder label="Feature initiative photo" ratio="16/9" />}
              />
            </div>
            {KIT.stories
              .concat(KIT.stories)
              .slice(1, 4)
              .map((s, i) => (
                <div key={i} style={{ gridColumn: 'span 4' }} className="kit-col-4">
                  <StoryCard
                    place={s.place}
                    title={s.title}
                    text={s.text}
                    ratio="1/1"
                    media={<ImagePlaceholder label={s.ph} ratio="1/1" />}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div
          className="ss-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))',
            gap: 'clamp(32px,6vw,96px)',
          }}
        >
          <div>
            <SectionHeading
              overline="Events"
              title="Come along"
              intro="Community events are open to everyone."
            />
            <Button {...linkTo(go, 'get-involved')} variant="secondary">
              All ways to get involved
            </Button>
          </div>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              borderBottom: '1px solid var(--border-default)',
            }}
          >
            {KIT.events.map((e, i) => (
              <EventRow key={i} ev={e} />
            ))}
          </ul>
        </div>
      </section>
      <section className="ss-section">
        <div className="ss-container">
          <SectionHeading
            overline="Local issues"
            title="Raised by residents"
            intro="Issues people have brought to Sujan, and where they connect to his priorities."
          />
          <div style={{ display: 'grid', gap: 0 }}>
            {KIT.priorities.map((p) => (
              <a
                key={p.key}
                {...linkTo(go, 'priorities/' + p.key)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) auto',
                  gap: 16,
                  alignItems: 'center',
                  padding: '22px 0',
                  borderTop: '1px solid var(--border-default)',
                  textDecoration: 'none',
                  color: 'var(--ink)',
                }}
              >
                <span style={{ display: 'grid', gap: 8 }}>
                  <span className="ss-h4">
                    [Local issue in residents’ words — {'{suburb}'}]
                  </span>
                  <Tag tone={p.tone} plain>
                    {p.title}
                  </Tag>
                </span>
                <Icon name="arrow-right" size={22} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <PhotoBand
        media={
          <ImagePlaceholder
            label="Full-width community photograph — to be supplied"
            ratio="auto"
            tone="deep"
            style={{ height: '100%' }}
          />
        }
        height="clamp(320px,50vh,560px)"
      />
      <section className="ss-section">
        <div className="ss-container">
          <QuoteBlock
            quote="[Approved resident quote about their neighbourhood]"
            name="[Resident name]"
            role="[Suburb]"
          />
        </div>
      </section>
    </>
  );
}
