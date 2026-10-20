'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { StoryCard } from '@/components/cards/StoryCard.jsx';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder.jsx';
import { Button } from '@/components/core/Button.jsx';
import { Tag } from '@/components/core/Tag.jsx';
import { Icon } from '@/components/core/Icon.jsx';
import { KIT } from '@/lib/data';
import { draft } from '@/lib/copy';
import { linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function CommunityPage() {
  const go = useGo();
  const copy = draft.community;
  const [feature, ...rest] = KIT.stories;
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
        title={
          <>
            Local, <em>in person</em>
          </>
        }
        lead={copy.heroLead}
        image={KIT.PHOTOS.communityHero}
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
                place={feature.place}
                kicker={feature.kicker}
                title={feature.title}
                text={feature.text}
                ratio="16/9"
                shape="corner"
                image={feature.image}
                media={
                  feature.image ? null : (
                    <ImagePlaceholder label={feature.ph} ratio="16/9" />
                  )
                }
              />
            </div>
            {rest.map((s) => (
              <div key={s.title} style={{ gridColumn: 'span 4' }} className="kit-col-4">
                <StoryCard
                  place={s.place}
                  kicker={s.kicker}
                  title={s.title}
                  text={s.text}
                  ratio="1/1"
                  image={s.image}
                  media={s.image ? null : <ImagePlaceholder label={s.ph} ratio="1/1" />}
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
            alignItems: 'start',
          }}
        >
          <div>
            <SectionHeading overline="Events" title="Come along" intro={copy.eventsIntro} />
            <Button {...linkTo(go, 'get-involved')} variant="secondary">
              All ways to get involved
            </Button>
          </div>
          <div
            style={{
              background: 'var(--white)',
              padding: 'clamp(24px,3vw,40px)',
              borderTop: '6px solid var(--green-500)',
              display: 'grid',
              gap: 16,
            }}
          >
            <p className="ss-lead">{copy.eventsEmpty}</p>
            <div>
              <Button href="/get-involved#updates">Stay updated</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="ss-section">
        <div className="ss-container">
          <SectionHeading
            overline="Local issues"
            title="Raised by residents"
            intro={copy.raisedIntro}
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
                  <span className="ss-h4">{p.raisedBy}</span>
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
    </>
  );
}
