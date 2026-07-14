import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface ArticleBodyProps {
  body: string;
}

const components: Components = {
  h2: ({ children }) => (
    <h2 className="mb-4 mt-10 font-heading text-2xl font-bold text-gray-900 first:mt-0">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-8 font-heading text-xl font-bold text-gray-900">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 font-body text-base leading-relaxed text-gray-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 ml-5 list-disc space-y-2 font-body text-base text-gray-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 ml-5 list-decimal space-y-2 font-body text-base text-gray-700">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="mb-5 border-l-4 border-blue/30 pl-4 font-body italic text-gray-600">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a href={href} className="font-medium text-blue underline hover:text-blue-dark" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  ),
  img: ({ src, alt }) =>
    typeof src === 'string' ? (
      <span className="my-8 block">
        <span className="relative block aspect-video w-full overflow-hidden rounded-2xl">
          <Image src={src} alt={alt ?? ''} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
        </span>
      </span>
    ) : null,
};

export function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="max-w-none">
      <ReactMarkdown components={components}>{body}</ReactMarkdown>
    </div>
  );
}
