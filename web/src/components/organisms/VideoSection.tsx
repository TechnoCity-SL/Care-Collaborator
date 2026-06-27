import { SectionLabel } from '@/components/atoms/SectionLabel';
import { Heading } from '@/components/atoms/Heading';

interface VideoSectionProps {
  label?: string;
  heading: string;
  subtext?: string;
  videoUrl: string;
}

function getSafeEmbedUrl(url: string): string {
  if (url.includes('youtube.com/embed/') || url.includes('youtube-nocookie.com/embed/')) {
    return url;
  }
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (match) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}`;
  }
  return url;
}

export function VideoSection({ label, heading, subtext, videoUrl }: VideoSectionProps) {
  const embedUrl = getSafeEmbedUrl(videoUrl);

  return (
    <section className="bg-surface-video py-[120px]" aria-labelledby="video-heading">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-8 text-center">
          {label && <SectionLabel label={label} className="mb-0" />}
          <Heading
            as="h2"
            id="video-heading"
            text={heading}
            className="font-heading text-[50px] font-semibold leading-[1.1] text-text-dark"
          />
          {subtext && (
            <p className="max-w-2xl text-[16px] leading-[29px] text-text-dark">{subtext}</p>
          )}
        </div>

        <div className="overflow-hidden rounded-[20px] shadow-[21px_24px_31px_0px_rgba(0,0,0,0.09),5px_6px_17px_0px_rgba(0,0,0,0.1)]">
          <div className="relative aspect-video bg-stats-gradient">
            <iframe
              src={embedUrl}
              title={heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
