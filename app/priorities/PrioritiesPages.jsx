'use client';

import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { Tag } from '@/components/core/Tag.jsx';
import { CTABanner } from '@/components/content/CTABanner.jsx';
import { Button } from '@/components/core/Button.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { SplitSection } from '@/components/content/SplitSection.jsx';
import { StatBlock } from '@/components/cards/StatBlock.jsx';
import { StoryCard } from '@/components/cards/StoryCard.jsx';
import { ImagePlaceholder } from '@/components/brand/ImagePlaceholder.jsx';
import { PriorityCard } from '@/components/cards/PriorityCard.jsx';
import { ArticleBody } from '@/components/article/ArticleBody.jsx';
import { KIT } from '@/lib/data';
import { NewsGridCard, Reveal, linkTo, useGo } from '@/components/kit/Shared.jsx';

export function PrioritiesPage() {
  const go = useGo();
  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Priorities' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        title={
          <>
            What <em>matters</em> to Cumberland
          </>
        }
        lead="Every priority starts with the people it affects. Four pillars, one reason."
      />
      <section className="ss-section">
        <div className="ss-container" style={{ display: 'grid' }}>
          {KIT.priorities.map((p) => (
            <Reveal
              key={p.key}
              as="article"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))',
                gap: '20px clamp(32px,6vw,96px)',
                padding: 'clamp(32px,4vw,56px) 0',
                borderTop: '1px solid var(--border-default)',
                position: 'relative',
              }}
            >
              <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--fs-display-s)',
                    lineHeight: 1,
                    color: 'var(--issue-' + p.tone + '-ink)',
                  }}
                >
                  {p.n}
                </span>
                <h2 className="ss-display-m">
                  <a
                    {...linkTo(go, 'priorities/' + p.key)}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {p.title}
                  </a>
                </h2>
              </div>
              <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
                <Tag tone={p.tone}>{p.title} matters</Tag>
                <p className="ss-lead">{p.body}</p>
                <TextLink {...linkTo(go, 'priorities/' + p.key)}>Why it matters</TextLink>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTABanner
        variant="deep"
        overline="Have your say"
        title={
          <>
            Tell us what <em>matters</em> to you
          </>
        }
        text="The issues on this page come from conversations with people across Cumberland."
        actions={
          <Button variant="inverse" size="lg" icon="arrow-right" {...linkTo(go, 'contact')}>
            Share a local issue
          </Button>
        }
      />
    </>
  );
}

export function PriorityDetailPage({ pkey }) {
  const go = useGo();
  const p = KIT.priorities.find((x) => x.key === pkey) || KIT.priorities[0];
  const others = KIT.priorities.filter((x) => x.key !== p.key);
  return (
    <>
      <Hero
        variant="issue"
        tone={p.tone}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'Priorities', href: '/priorities', key: 'priorities' },
              { label: p.title },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        overline={<Tag tone={p.tone}>Priority {p.n}</Tag>}
        title={
          <>
            {p.title} <em>matters</em>
          </>
        }
        lead={p.human}
        actions={
          <Button {...linkTo(go, 'get-involved')} icon="arrow-right">
            Get involved
          </Button>
        }
        media={
          <ImagePlaceholder
            label={'People affected — ' + p.title + ' photo to be supplied'}
            ratio="4/5"
          />
        }
      />
      <section className="ss-section">
        <div
          className="ss-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))',
            gap: 'clamp(32px,6vw,96px)',
          }}
        >
          <div>
            <p className="ss-overline" style={{ marginBottom: 16 }}>
              Why it matters
            </p>
            <h2 className="ss-display-s">[What’s happening, in one line]</h2>
          </div>
          <ArticleBody>
            <p>
              [Context — the issue explained plainly, starting from what people in Cumberland are
              experiencing.]
            </p>
            <ul>
              <li>[A key fact, written as an outcome for people]</li>
              <li>[A second key fact]</li>
              <li>[A third key fact]</li>
            </ul>
          </ArticleBody>
        </div>
        <div className="ss-container" style={{ marginTop: 'clamp(40px,5vw,72px)' }}>
          <StatBlock
            items={[
              {
                value: '[00%]',
                label: '[What this number means for local people]',
                source: '[Verified source]',
              },
              {
                value: '[0,000]',
                label: '[Households / people affected]',
                source: '[Verified source]',
              },
              {
                value: '[$000]',
                label: '[Cost to a typical household]',
                source: '[Verified source]',
              },
            ]}
          />
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div className="ss-container">
          <SplitSection
            image={{
              src: KIT.P + 'portrait-shirt-06.jpg',
              alt: 'Sujan Selven',
              position: '50% 30%',
            }}
            overline="Sujan’s position"
            title="What Sujan is working towards"
          >
            <p>{p.body}</p>
            <p>[Specific commitments or work — approved content to be supplied.]</p>
          </SplitSection>
        </div>
      </section>
      <section className="ss-section">
        <div className="ss-container">
          <SectionHeading
            overline="Community stories"
            title="The people behind it"
            action={<TextLink {...linkTo(go, 'community')}>More stories</TextLink>}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))',
              gap: 'clamp(20px,3vw,40px)',
            }}
          >
            {KIT.stories.map((s, i) => (
              <StoryCard
                key={i}
                place={s.place}
                title={s.title}
                text={s.text}
                ratio="1/1"
                media={<ImagePlaceholder label={s.ph} ratio="1/1" />}
                {...linkTo(go, 'community')}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="ss-section" style={{ paddingTop: 0 }}>
        <div className="ss-container">
          <SectionHeading
            overline="Related news"
            title={p.title + ' updates'}
            action={<TextLink {...linkTo(go, 'news')}>All news</TextLink>}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: 32,
            }}
          >
            {KIT.news.slice(0, 3).map((n) => (
              <NewsGridCard key={n.id} item={{ ...n, category: p.title }} go={go} />
            ))}
          </div>
        </div>
      </section>
      <CTABanner
        variant="green"
        title={
          <>
            Because the <em>people</em> matter
          </>
        }
        text="Add your voice — share how this affects you or your family."
        actions={
          <>
            <Button variant="inverse" size="lg" icon="arrow-right" {...linkTo(go, 'contact')}>
              Share your story
            </Button>
            <Button variant="secondary" size="lg" {...linkTo(go, 'get-involved')}>
              Volunteer
            </Button>
          </>
        }
      />
      <section className="ss-section--sm">
        <div className="ss-container">
          <p className="ss-overline" style={{ marginBottom: 20 }}>
            Other priorities
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))',
              gap: 16,
            }}
          >
            {others.map((o) => (
              <PriorityCard
                key={o.key}
                tone={o.tone}
                number={o.n}
                title={o.title}
                summary={o.short}
                {...linkTo(go, 'priorities/' + o.key)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
