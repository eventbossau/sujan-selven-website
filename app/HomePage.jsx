'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Button } from '@/components/core/Button.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { SplitSection } from '@/components/content/SplitSection.jsx';
import { PriorityCard } from '@/components/cards/PriorityCard.jsx';
import { StoryCard } from '@/components/cards/StoryCard.jsx';
import { NewsCard } from '@/components/cards/NewsCard.jsx';
import { CTABanner } from '@/components/content/CTABanner.jsx';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder.jsx';
import { KIT } from '@/lib/data';
import { draft } from '@/lib/copy';
import { ContactStrip, NewsGridCard, Reveal, linkTo, useGo } from '@/components/kit/Shared.jsx';

export default function HomePage() {
  const go = useGo();
  const K = KIT;
  const copy = draft.home;
  const feature = K.news[0];
  return (
    <>
      <Hero
        variant="campaign"
        overline={copy.heroOverline}
        title={
          <>
            Because the <em>people</em> matter
          </>
        }
        lead={copy.heroLead}
        image={{
          src: K.P + 'portrait-blazer-03.jpg',
          alt: 'Sujan Selven, Greens candidate for Prospect, standing in a local park',
          position: '50% 22%',
        }}
        actions={
          <>
            <Button variant="inverse" icon="arrow-right" size="lg" {...linkTo(go, 'get-involved')}>
              Join the campaign
            </Button>
            <Button variant="secondary" size="lg" {...linkTo(go, 'about')}>
              Meet Sujan
            </Button>
          </>
        }
      />
      <section className="ss-section">
        <Reveal
          className="ss-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
            gap: 'clamp(28px,5vw,96px)',
            alignItems: 'end',
          }}
        >
          <p className="ss-display-l" style={{ maxWidth: '16ch' }}>
            Every issue is about the <span className="ss-accent">people</span> it affects.
          </p>
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="ss-lead">{copy.introBody}</p>
          </div>
        </Reveal>
      </section>
      <section className="ss-section" style={{ paddingTop: 0 }}>
        <div className="ss-container">
          <SplitSection
            image={{
              src: K.P + 'portrait-shirt-03.jpg',
              alt: 'Portrait of Sujan Selven',
              position: '50% 30%',
            }}
            frame="bl"
            overline={copy.meetOverline}
            title={copy.meetHeadline}
            actions={<TextLink {...linkTo(go, 'about')}>Read my story</TextLink>}
          >
            {copy.meetBody.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </SplitSection>
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div className="ss-container">
          <SectionHeading
            overline="Priorities"
            title="What matters here"
            intro={copy.prioritiesIntro}
            action={<TextLink {...linkTo(go, 'priorities')}>All priorities</TextLink>}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))',
              gap: 16,
            }}
          >
            {K.priorities.map((p) => (
              <PriorityCard
                key={p.key}
                tone={p.tone}
                number={p.n}
                title={p.title}
                summary={p.short}
                cta="Why it matters"
                {...linkTo(go, 'priorities/' + p.key)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="ss-section">
        <div className="ss-container">
          <SectionHeading
            overline="Community"
            title="Out in the neighbourhood"
            intro={copy.communityIntro}
            action={<TextLink {...linkTo(go, 'community')}>See the community work</TextLink>}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
              gap: 'clamp(20px,3vw,40px)',
              alignItems: 'start',
            }}
          >
            {K.stories.map((s, i) => (
              <StoryCard
                key={s.title}
                place={s.place}
                kicker={s.kicker}
                title={s.title}
                text={s.text}
                ratio={i === 1 ? '4/5' : '1/1'}
                media={<ImagePlaceholder label={s.ph} ratio={i === 1 ? '4/5' : '1/1'} />}
                {...linkTo(go, 'community')}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="ss-section" style={{ paddingTop: 0 }}>
        <div className="ss-container">
          <SectionHeading
            overline="News & updates"
            title="Latest"
            action={<TextLink {...linkTo(go, 'news')}>All news</TextLink>}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))',
              gap: 'clamp(24px,4vw,64px)',
            }}
          >
            <NewsCard
              image={feature.image}
              media={
                feature.image ? null : <ImagePlaceholder label={feature.ph} ratio="3/2" />
              }
              category={feature.category}
              categoryTone={K.catTone[feature.category]}
              date={feature.date}
              title={feature.title}
              excerpt={feature.excerpt}
              {...linkTo(go, 'news/' + feature.slug)}
            />
            <div>
              {K.news.slice(1, 5).map((n) => (
                <NewsGridCard key={n.id} item={n} go={go} layout="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABanner
        variant="green"
        overline="Get involved"
        title={
          <>
            Be part of <em>it</em>
          </>
        }
        text={copy.getInvolvedText}
        actions={
          <>
            <Button variant="inverse" size="lg" icon="arrow-right" {...linkTo(go, 'get-involved')}>
              Volunteer
            </Button>
            <Button variant="secondary" size="lg" href="/get-involved#updates">
              Stay updated
            </Button>
          </>
        }
      />
      <ContactStrip go={go} />
    </>
  );
}
