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
  return (
    <>
      <Hero
        variant="campaign"
        overline="Sujan Selven · Cumberland"
        title={
          <>
            Because the <em>people</em> matter
          </>
        }
        lead={copy.heroLead}
        image={{
          src: K.P + 'portrait-blazer-03.jpg',
          alt: 'Sujan Selven standing in a local park, smiling',
          position: '50% 22%',
        }}
        actions={
          <>
            <Button variant="inverse" icon="arrow-right" size="lg" {...linkTo(go, 'get-involved')}>
              Get involved
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
          <p className="ss-display-l" style={{ maxWidth: '13ch' }}>
            Every issue matters because of the <span className="ss-accent">people</span> it affects.
          </p>
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="ss-lead">
              From healthcare and housing to transport, education and local communities — the focus
              is on clear, human outcomes people can understand.
            </p>
            <p className="ss-body">Every message changes with the issue, but the reason stays the same.</p>
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
            overline="Meet Sujan"
            title={copy.meetHeadline}
            actions={<TextLink {...linkTo(go, 'about')}>Read Sujan’s story</TextLink>}
          >
            <p>{copy.meetBody[0]}</p>
            <p>{copy.meetBody[1]}</p>
          </SplitSection>
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div className="ss-container">
          <SectionHeading
            overline="Priorities"
            title="What matters here"
            intro="Four areas that shape everyday life across Cumberland."
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
            action={<TextLink {...linkTo(go, 'community')}>Community work</TextLink>}
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
                key={i}
                place={s.place}
                title={s.title}
                text={s.text}
                ratio={i === 1 ? '4/5' : '1/1'}
                media={
                  <ImagePlaceholder label={s.ph} ratio={i === 1 ? '4/5' : '1/1'} />
                }
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
              image={{
                src: K.P + 'portrait-blazer-02.jpg',
                alt: 'Sujan Selven',
                position: '50% 30%',
              }}
              category="Announcements"
              categoryTone="neutral"
              date="[DD Mon YYYY]"
              title="[Featured headline in sentence case]"
              excerpt="[Two-sentence summary of the most important current update.]"
              {...linkTo(go, 'news/article')}
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
        text="Volunteer, come along to a community event, or simply stay in the loop."
        actions={
          <>
            <Button variant="inverse" size="lg" icon="arrow-right" {...linkTo(go, 'get-involved')}>
              Volunteer
            </Button>
            <Button variant="secondary" size="lg" {...linkTo(go, 'get-involved')}>
              Stay updated
            </Button>
          </>
        }
      />
      <ContactStrip go={go} />
    </>
  );
}
