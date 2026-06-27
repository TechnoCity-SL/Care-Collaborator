import Link from 'next/link';
import { Tag } from '@/components/atoms/Tag';
import type { ArticleDTO } from '@/types/pages';

interface ArticleCardProps {
  article: ArticleDTO;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const date = new Date(article.publishedAt).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (featured) {
    return (
      <Link
        href={`/insights/${article.slug}`}
        className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex h-56 items-center justify-center bg-surface-alt lg:h-auto lg:w-2/5">
            <span className="text-4xl text-muted/30" aria-hidden="true">✦</span>
          </div>
          <div className="p-8 lg:w-3/5">
            <div className="mb-3 flex items-center gap-3">
              <Tag category={article.category} />
              <span className="text-xs text-muted">{date}</span>
            </div>
            <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-green transition-colors sm:text-2xl">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="mb-4 text-sm leading-relaxed text-muted line-clamp-3">
                {article.excerpt}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted">
              {article.author && <span>{article.author}</span>}
              {article.read_time && <span>{article.read_time} min read</span>}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-44 items-center justify-center bg-surface-alt">
        <span className="text-3xl text-muted/30" aria-hidden="true">✦</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <Tag category={article.category} />
          <span className="text-xs text-muted">{date}</span>
        </div>
        <h3 className="mb-2 flex-1 text-base font-bold text-gray-900 group-hover:text-green transition-colors">
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mb-4 text-sm leading-relaxed text-muted line-clamp-2">
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted">
          {article.author && <span>{article.author}</span>}
          {article.read_time && <span>{article.read_time} min read</span>}
        </div>
      </div>
    </Link>
  );
}
