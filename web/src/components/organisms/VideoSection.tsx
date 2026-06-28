import { useState } from 'react';
import Image from 'next/image';
import { SectionLabel } from '@/components/atoms/SectionLabel';
import type { CloudinaryMediaDTO } from '@/types/pages';

interface VideoSectionProps {
  label?: string;
  heading: string;
  headingHighlight?: string;
  subtext?: string;
  videoUrl?: string;
  videoFile?: CloudinaryMediaDTO;
}

function getYouTubeEmbedId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/);
  return match ? match[1] : null;
}

export function VideoSection({
  label,
  heading,
  headingHighlight,
  subtext,
  videoUrl,
  videoFile,
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const canPlay = !!videoFile?.url || !!videoUrl;

  const renderPlayer = () => {
    if (videoFile?.url) {
      return (
        <video
          src={videoFile.url}
          autoPlay
          controls
          className="absolute inset-0 h-full w-full"
        />
      );
    }
    if (videoUrl) {
      const embedId = getYouTubeEmbedId(videoUrl);
      const src = embedId
        ? `https://www.youtube-nocookie.com/embed/${embedId}?autoplay=1`
        : videoUrl;
      return (
        <iframe
          src={src}
          title={heading}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      );
    }
    return null;
  };

  const resolvedHighlight = (() => {
    if (headingHighlight && heading.includes(headingHighlight)) return headingHighlight;
    return heading;
  })();

  const renderHeading = () => {
    const [before, after] = heading.split(resolvedHighlight);
    return (
      <>
        {before}
        <span className="relative inline-block">
          {/* Wavy brush underline rendered first → sits behind the text */}
          <span className="pointer-events-none absolute inset-x-0 bottom-[-5] left-[50%] select-none" aria-hidden="true">
            <Image
              src="/images/video-section/wavy-underline.svg"
              alt=""
              width={438}
              height={44}
              className="h-auto w-[100%]"
            />
          </span>
          <span className="relative">{resolvedHighlight}</span>
        </span>
        {after}
      </>
    );
  };

  return (
    <section className="relative bg-surface-video py-[120px]" aria-labelledby="video-heading">
      {/* Sparkle — top-right decorative, Figma node 103:87 */}
      <div
        className="pointer-events-none absolute top-[127px] hidden select-none lg:block"
        style={{ left: 'calc(50% + 452px)' }}
        aria-hidden="true"
      >
        <Image
          src="/images/video-section/sparkle.svg"
          alt=""
          width={31}
          height={27}
        />
      </div>

      <div className="mx-auto max-w-[1300px] px-6 lg:px-0">
        {/* Text block */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-8">
            {label && <SectionLabel label={label} />}
            <h2
              id="video-heading"
              className="font-heading text-[clamp(32px,4vw,50px)] font-semibold leading-[1.1] text-text-dark"
            >
              {renderHeading()}
            </h2>
          </div>
          {subtext && (
            <p className="text-[16px] leading-[29px] text-text-dark">{subtext}</p>
          )}
        </div>

        {/* Video container + bird */}
        <div className="relative mt-8">
          {/* Bird illustration — Figma node 252:472, sits 123px above the video */}
          <div
            className="pointer-events-none absolute -top-[102px] left-[0px] z-10 hidden select-none lg:block"
            aria-hidden="true"
          >
            <Image
              src="/images/video-section/bird.png"
              alt=""
              width={147}
              height={132}
            />
          </div>

          {/* Video player */}
          <div
            className="relative aspect-[1300/666] overflow-hidden rounded-[20px] shadow-[129px_149px_55px_0px_rgba(0,0,0,0),82px_95px_50px_0px_rgba(0,0,0,0.01),46px_54px_43px_0px_rgba(0,0,0,0.05),21px_24px_31px_0px_rgba(0,0,0,0.09),5px_6px_17px_0px_rgba(0,0,0,0.1)] bg-video-player-gradient"
          >
            {isPlaying ? (
              renderPlayer()
            ) : (
              <button
                type="button"
                aria-label="Play video"
                className="absolute inset-0 flex items-center justify-center"
                onClick={canPlay ? () => setIsPlaying(true) : undefined}
                disabled={!canPlay}
              >
                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 hover:scale-110">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-10 w-10 translate-x-0.5 text-blue-dark"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
