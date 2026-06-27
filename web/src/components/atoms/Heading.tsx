interface HeadingProps {
  text: string;
  highlight?: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
  highlightClassName?: string;
}

export function Heading({
  text,
  highlight,
  as: Tag = 'h2',
  id,
  className = '',
  highlightClassName = 'text-green',
}: HeadingProps) {
  if (!highlight || !text.includes(highlight)) {
    return <Tag id={id} className={className}>{text}</Tag>;
  }

  const [before, after] = text.split(highlight);
  return (
    <Tag id={id} className={className}>
      {before}
      <span className={highlightClassName}>{highlight}</span>
      {after}
    </Tag>
  );
}
