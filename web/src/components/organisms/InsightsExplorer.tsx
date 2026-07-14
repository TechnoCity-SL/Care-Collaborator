import { useMemo, useState } from 'react';
import { HeroSection } from '@/components/organisms/HeroSection';
import { SearchBar } from '@/components/molecules/SearchBar';
import { FilterPills } from '@/components/molecules/FilterPills';
import { ArticleCard } from '@/components/molecules/ArticleCard';
import { SidebarCtaCard } from '@/components/molecules/SidebarCtaCard';
import { PopularArticlesList } from '@/components/molecules/PopularArticlesList';
import { getCategoryLabel } from '@/components/atoms/Tag';
import type { ArticleCategory, ArticleDTO, InsightsPageDTO } from '@/types/pages';

interface InsightsExplorerProps {
  pageData: InsightsPageDTO;
  articles: ArticleDTO[];
  featuredArticle: ArticleDTO | null;
  popularArticles: ArticleDTO[];
}

const FILTER_CATEGORIES: ArticleCategory[] = [
  'technology',
  'onboarding',
  'fuel_and_costs',
  'e_signature',
  'digital_transformation',
  'operations',
];

const PAGE_SIZE = 6;

export function InsightsExplorer({ pageData, articles, featuredArticle, popularArticles }: InsightsExplorerProps) {
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filterOptions = useMemo(
    () => [
      { value: 'all', label: 'All' },
      ...FILTER_CATEGORIES.map((value) => ({ value, label: getCategoryLabel(value) })),
    ],
    []
  );

  const isFiltering = category !== 'all' || query.trim().length > 0;

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles
      .filter((article) => isFiltering || article.id !== featuredArticle?.id)
      .filter((article) => category === 'all' || article.category === category)
      .filter(
        (article) =>
          normalizedQuery === '' ||
          article.title.toLowerCase().includes(normalizedQuery) ||
          (article.excerpt?.toLowerCase().includes(normalizedQuery) ?? false)
      );
  }, [articles, category, query, featuredArticle?.id, isFiltering]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = filteredArticles.length > visibleCount;

  function handleSelectCategory(value: string) {
    setCategory(value);
    setVisibleCount(PAGE_SIZE);
  }

  function handleSearch(value: string) {
    setQuery(value);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      {pageData.hero_banner && (
        <HeroSection data={pageData.hero_banner}>
          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        </HeroSection>
      )}

      <div className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FilterPills options={filterOptions} selected={category} onSelect={handleSelectCategory} />
        </div>
      </div>

      <div className="bg-surface-alt pb-16 pt-4 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              {!isFiltering && featuredArticle && (
                <div className="mb-10">
                  <ArticleCard article={featuredArticle} featured />
                </div>
              )}

              {visibleArticles.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {visibleArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <p className="py-12 text-center text-muted">
                  {isFiltering
                    ? 'No articles match your search or filter — try something else.'
                    : 'No articles yet — check back soon.'}
                </p>
              )}

              {hasMore && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
                    className="bg-btn-blue bg-clip-text font-body text-sm font-medium text-transparent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                  >
                    Load more articles
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Sidebar" className="flex flex-col gap-8 self-start lg:sticky lg:top-24">
              {pageData.sidebar_cta_heading && (
                <SidebarCtaCard
                  heading={pageData.sidebar_cta_heading}
                  body={pageData.sidebar_cta_body}
                  primaryCta={pageData.sidebar_cta_primary}
                  secondaryCta={pageData.sidebar_cta_secondary}
                />
              )}

              <PopularArticlesList articles={popularArticles} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
