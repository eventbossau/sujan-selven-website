'use client';

import React from 'react';
import { Hero } from '@/components/content/Hero.jsx';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs.jsx';
import { Tag } from '@/components/core/Tag.jsx';
import { NewsCard } from '@/components/cards/NewsCard.jsx';
import { Pagination } from '@/components/navigation/Pagination.jsx';
import { ArticleBody } from '@/components/article/ArticleBody.jsx';
import { ShareLinks } from '@/components/core/ShareLinks.jsx';
import { SectionHeading } from '@/components/content/SectionHeading.jsx';
import { TextLink } from '@/components/core/TextLink.jsx';
import { Button } from '@/components/core/Button.jsx';
import { KIT, newsBySlug } from '@/lib/data';
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
                image={lead.image || KIT.PHOTOS.newsFeature}
                category={lead.category}
                categoryTone={KIT.catTone[lead.category]}
                date={lead.date}
                title={lead.title}
                excerpt={lead.excerpt}
                {...linkTo(go, 'news/' + lead.slug)}
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

export function ArticlePage({ slug }) {
  const go = useGo();
  const item = newsBySlug(slug) || KIT.news[0];
  const related = KIT.news.filter((n) => n.slug !== item.slug).slice(0, 3);
  const meta = [{ icon: 'map-pin', label: 'Prospect / Western Sydney' }];
  if (item.date) meta.unshift({ icon: 'calendar', label: item.date });
  const cta = item.cta || { label: 'See priorities', route: 'priorities' };

  return (
    <>
      <Hero
        variant="article"
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/', key: 'home' },
              { label: 'News', href: '/news', key: 'news' },
              { label: item.title },
            ]}
            onNavigate={(k) => go(k)}
          />
        }
        overline={<Tag tone={KIT.catTone[item.category] || 'brand'}>{item.category}</Tag>}
        title={item.title}
        lead={item.excerpt}
        meta={meta}
        image={
          item.image
            ? { ...item.image, caption: item.ph }
            : { ...KIT.PHOTOS.newsFeature, caption: item.ph }
        }
      />
      <section className="ss-section" style={{ paddingTop: 'clamp(32px,4vw,64px)' }}>
        <div
          className="ss-container"
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', justifyItems: 'center' }}
        >
          <ArticleBody>
            <p className="ss-prose__lead">{item.excerpt}</p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 8,
              }}
            >
              <Button {...linkTo(go, cta.route)} icon="arrow-right">
                {cta.label}
              </Button>
              <Button variant="secondary" {...linkTo(go, 'contact')}>
                Contact the team
              </Button>
            </div>
            <hr />
            <div className="ss-share">
              <span className="ss-overline">Share</span>
              <ShareLinks title={item.title} />
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
            {related.map((n) => (
              <NewsGridCard key={n.id} item={n} go={go} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
