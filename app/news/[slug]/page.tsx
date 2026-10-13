import type { Metadata } from 'next';
import { news, newsBySlug } from '@/lib/data';
import { ArticlePage } from '../NewsPages.jsx';

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = newsBySlug(slug);
  return {
    title: item?.title || 'News',
    description: item?.excerpt,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticlePage slug={slug} />;
}
