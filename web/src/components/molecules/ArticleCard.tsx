import Image from 'next/image';
import Link from 'next/link';
import { Tag, categoryConfig } from '@/components/atoms/Tag';
import type { ArticleDTO } from '@/types/pages';

interface ArticleCardProps {
  article: ArticleDTO;
  featured?: boolean;
}

function formatDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const date = formatDate(article.publishedAt);
  const hasCoverImage = !!article.cover_image?.url;

  if (featured) {
    return (
      <Link
        href={`/insights/${article.slug}`}
        className="group block overflow-hidden rounded-[20px] border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <div className={`relative flex h-[220px] items-end p-8 sm:h-[263px] ${hasCoverImage ? '' : 'bg-featured-card-gradient'}`}>
          {hasCoverImage && (
            <Image
              src={article.cover_image!.url}
              alt={article.cover_image!.alternativeText ?? ''}
              fill
              sizes="(min-width: 1024px) 940px, 100vw"
              className="object-cover object-center"
            />
          )}
          <div className={`relative z-10 flex flex-col gap-4 ${hasCoverImage ? 'drop-shadow-sm' : ''}`}>
            <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-teal to-blue px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-black">
              Featured
            </span>
            <h2 className="max-w-2xl font-heading text-2xl font-bold leading-tight text-white sm:text-[28px]">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="max-w-xl font-body text-sm text-white/90">{article.excerpt}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8 p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag category={article.category} />
                <span className="font-sans text-sm text-footer-muted">{date}</span>
              </div>
              {article.read_time && (
                <span className="font-sans text-sm text-footer-muted">{article.read_time} min read</span>
              )}
            </div>
            <h3 className="font-heading text-xl font-semibold text-text-dark sm:text-2xl">
              {article.title}
            </h3>
            {article.excerpt && (
              <p className="font-body text-sm leading-relaxed text-text-body line-clamp-3">
                {article.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {article.author && (
              <div className="flex flex-col">
                <span className="font-sans text-sm font-medium text-text-dark">- {article.author}</span>
                {article.author_role && (
                  <span className="font-sans text-xs text-footer-muted">{article.author_role}</span>
                )}
              </div>
            )}
            <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-blue-label transition-transform group-hover:translate-x-0.5">
              Read article
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  const { bgClass } = categoryConfig[article.category];

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-border transition-shadow hover:shadow-md"
    >
      <div className={`relative h-[72px] w-full shrink-0 ${hasCoverImage ? '' : bgClass}`}>
        {hasCoverImage && (
          <Image
            src={article.cover_image!.url}
            alt={article.cover_image!.alternativeText ?? ''}
            fill
            sizes="(min-width: 1024px) 450px, 100vw"
            className="object-cover object-center"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <Tag category={article.category} />
            <span className="font-sans text-sm text-footer-muted">{date}</span>
          </div>
          <h3 className="font-body text-base font-medium text-text-dark group-hover:text-blue transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="font-body text-sm leading-relaxed text-text-body line-clamp-2">
              {article.excerpt}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          {article.author && (
            <span className="font-sans font-medium text-text-dark">- {article.author}</span>
          )}
          {article.read_time && (
            <span className="font-sans text-footer-muted">{article.read_time} min read</span>
          )}
        </div>
      </div>
    </Link>
  );
}
