import Image from 'next/image';
import { useParallaxOffset } from '@/hooks/useParallaxOffset';
import type { ParallaxCloudDTO } from '@/types/pages';

interface ParallaxCloudProps {
  cloud: ParallaxCloudDTO;
}

export function ParallaxCloud({ cloud }: ParallaxCloudProps) {
  const offset = useParallaxOffset(cloud.speed);

  return (
    <div
      className="pointer-events-none absolute select-none"
      style={{
        top: cloud.top,
        bottom: cloud.bottom,
        left: cloud.left,
        right: cloud.right,
        zIndex: cloud.z_index ?? 0,
        transform: `translate3d(0, ${offset}px, 0)`,
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <Image
        src={cloud.image.url}
        alt=""
        width={cloud.image.width ?? 200}
        height={cloud.image.height ?? 120}
        className="h-auto w-auto"
      />
    </div>
  );
}
