'use client';

import React from 'react';
import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { Tag } from '@/components/core/Tag.jsx';
import { NewsCard } from '@/components/cards/NewsCard.jsx';
import { Pagination } from '@/components/navigation/Pagination.jsx';
import { ArticleBody } from '@/components/article/ArticleBody.jsx';
import { QuoteBlock } from '@/components/cards/QuoteBlock.jsx';
import { SocialLinks } from '@/components/core/SocialLinks.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { KIT } from '@/lib/data';
import { NewsGridCard, linkTo, useGo } from '@/components/kit/Shared.jsx';

export function NewsPage() {
  const go = useGo();
  const [cat, setCat] = React.useState('All');
  const [page, setPage] = React.useState(1);
  const pageSize = 9;
  const list = KIT.news.filter((n) => cat === 'All' || n.category === cat);
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = list.slice(start, start + pageSize);
  const lead = safePage === 1 ? pageItems[0] : null;
  const rest = safePage === 1 ? pageItems.slice(1) : pageItems;

  const changePage = (next) => {
    setPage(next);
    const el = document.getElementById('news-results');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Hero
        variant="page"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'News' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        title="What’s new"
        lead="Community updates, local news and progress on the issues that matter."
      />
      <section className="ss-section" style={{ paddingTop: 'clamp(32px,4vw,56px)' }}>
        <div className="ss-container" id="news-results">
          <div
            role="group"
            aria-label="Filter by category"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 'clamp(32px,4vw,56px)',
            }}
          >
            {KIT.categories.map((c) => (
              <Tag
                key={c}
                size="lg"
                tone={c === 'All' ? 'neutral' : KIT.catTone[c]}
                onClick={() => {
                  setCat(c);
                  setPage(1);
                }}
                selected={cat === c}
              >
                {c}
              </Tag>
            ))}
          </div>
          {lead && (
            <div style={{ marginBottom: 'clamp(48px,6vw,88px)' }}>
              <NewsCard
                layout="feature"
                image={
                  lead.image || {
                    src: KIT.P + 'portrait-blazer-02.jpg',
                    alt: 'Sujan Selven',
                    position: '50% 30%',
                  }
                }
                category={lead.category}
                categoryTone={KIT.catTone[lead.category]}
                date={lead.date}
                title={lead.title}
                excerpt={lead.excerpt}
                {...linkTo(go, 'news/article')}
              />
            </div>
          )}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))',
              gap: '48px 32px',
            }}
          >
            {rest.map((n) => (
              <NewsGridCard key={n.id} item={n} go={go} />
            ))}
          </div>
          {!list.length && <p className="ss-lead">No updates in this category yet.</p>}
          {list.length > 0 && totalPages > 1 && (
            <div style={{ marginTop: 64 }}>
              <Pagination page={safePage} total={totalPages} onChange={changePage} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function ArticlePage() {
  const go = useGo();
  return (
    <>
      <Hero
        variant="article"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'News', href: '/news', key: 'news' },
              { label: '[Article]' },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        overline={<Tag tone="brand">Community</Tag>}
        title="[Article headline in sentence case, up to two lines]"
        lead="[Standfirst — the human consequence in one sentence.]"
        meta={[
          { icon: 'calendar', label: '[DD Month YYYY]' },
          { icon: 'clock', label: '[X] min read' },
          { icon: 'map-pin', label: '[Suburb]' },
        ]}
        image={{
          src: KIT.P + 'portrait-blazer-01.jpg',
          alt: 'Sujan Selven',
          position: '50% 28%',
          caption: '[Photo caption and credit]',
        }}
      />
      <section className="ss-section" style={{ paddingTop: 'clamp(32px,4vw,64px)' }}>
        <div
          className="ss-container"
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', justifyItems: 'center' }}
        >
          <ArticleBody>
            <p className="ss-prose__lead">
              [Opening paragraph: who is affected and what changes for them.]
            </p>
            <p>
              [Body paragraph with the detail. Keep sentences short and local. Link to related{' '}
              <a
                href="/priorities"
                onClick={(e) => {
                  e.preventDefault();
                  go('priorities');
                }}
              >
                priorities
              </a>{' '}
              where relevant.]
            </p>
            <h2>[Section heading]</h2>
            <p>[Body paragraph.]</p>
            <ul>
              <li>[What this means for residents]</li>
              <li>[What happens next]</li>
              <li>[How people can get involved]</li>
            </ul>
            <QuoteBlock
              variant="inline"
              quote="[Approved quote]"
              name="[Name]"
              role="[Role or suburb]"
            />
            <h3>[Sub-heading]</h3>
            <p>[Closing paragraph with a clear next step.]</p>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <span className="ss-overline" style={{ color: 'var(--ink)' }}>
                Share
              </span>
              <SocialLinks links={KIT.socials} />
            </div>
          </ArticleBody>
        </div>
      </section>
      <section className="ss-section" style={{ background: 'var(--surface-subtle)' }}>
        <div className="ss-container">
          <SectionHeading
            overline="Keep reading"
            title="Related"
            action={<TextLink {...linkTo(go, 'news')}>All news</TextLink>}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
              gap: 32,
            }}
          >
            {KIT.news.slice(3, 6).map((n) => (
              <NewsGridCard key={n.id} item={n} go={go} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
