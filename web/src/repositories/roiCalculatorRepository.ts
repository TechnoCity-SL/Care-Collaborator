import { strapiGet } from '@/lib/strapi';
import type { RoiCalculatorPageDTO } from '@/types/pages';

export async function fetchRoiCalculatorPage(): Promise<RoiCalculatorPageDTO> {
  const response = await strapiGet<{ data: RoiCalculatorPageDTO }>(
    '/roi-calculator-page' +
      '?populate[hero_banner][populate][primary_cta]=*' +
      '&populate[hero_banner][populate][secondary_cta]=*' +
      '&populate[hero_banner][populate][bg_image][fields][0]=url' +
      '&populate[hero_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][bg_image][fields][2]=width' +
      '&populate[hero_banner][populate][bg_image][fields][3]=height' +
      '&populate[hero_banner][populate][badges]=*' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][0]=url' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][2]=width' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][3]=height' +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL'
  );
  return response.data;
}
