import Link from 'next/link';
import { getCategoryLabel } from '@/components/atoms/Tag';
import type { ArticleDTO } from '@/types/pages';

interface PopularArticlesListProps {
  articles: ArticleDTO[];
}

export function PopularArticlesList({ articles }: PopularArticlesListProps) {
  if (articles.length === 0) return null;

  return (
    <div className="rounded-[20px] border border-border/70 bg-surface-video p-6">
      <p className="mb-4 font-sans text-lg font-bold uppercase tracking-[0.08em] text-blue-dark">
        Popular this month
      </p>
      <ul className="divide-y divide-border/70">
        {articles.map((article, index) => (
          <li key={article.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <span className="font-heading text-2xl font-bold text-blue/30" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <Link href={`/insights/${article.slug}`} className="group flex-1">
              <p className="font-body text-sm font-medium text-text-dark group-hover:text-blue transition-colors line-clamp-2">
                {article.title}
              </p>
              <p className="mt-2 font-sans text-xs text-footer-muted">
                {article.read_count
                  ? `${article.read_count.toLocaleString('en-AU')} reads`
                  : article.read_time
                    ? `${article.read_time} min read`
                    : null}
                {' · '}
                {getCategoryLabel(article.category)}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
