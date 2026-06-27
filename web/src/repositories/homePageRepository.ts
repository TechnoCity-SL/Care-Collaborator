import { strapiGet } from '@/lib/strapi';
import type { HomePageDTO } from '@/types/pages';

export async function fetchHomePage(): Promise<HomePageDTO> {
  const response = await strapiGet<{ data: HomePageDTO }>(
    '/home-page' +
      '?populate[hero_banner][populate][primary_cta]=*' +
      '&populate[hero_banner][populate][secondary_cta]=*' +
      '&populate[hero_banner][populate][image][fields][0]=url' +
      '&populate[hero_banner][populate][image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][image][fields][2]=width' +
      '&populate[hero_banner][populate][image][fields][3]=height' +
      '&populate[hero_banner][populate][bg_image][fields][0]=url' +
      '&populate[hero_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][bg_image][fields][2]=width' +
      '&populate[hero_banner][populate][bg_image][fields][3]=height' +
      '&populate[hero_banner][populate][badges]=*' +
      '&populate[stats_banner][populate][stats]=*' +
      '&populate[stats_banner][populate][bg_image][fields][0]=url' +
      '&populate[stats_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[stats_banner][populate][bg_image][fields][2]=width' +
      '&populate[stats_banner][populate][bg_image][fields][3]=height' +
      // features has an icon (media) sub-field — exclude it to avoid Strapi v5 populate bug
      '&populate[features][fields][0]=title' +
      '&populate[features][fields][1]=description' +
      '&populate[steps]=*' +
      '&populate[cta_banner][populate][primary_cta]=*' +
      '&populate[cta_banner][populate][secondary_cta]=*' +
      '&populate[cta_banner][populate][bg_image][fields][0]=url' +
      '&populate[cta_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[cta_banner][populate][bg_image][fields][2]=width' +
      '&populate[cta_banner][populate][bg_image][fields][3]=height' +
      // seo has og_image (media) sub-field — exclude it; only fetch scalar fields
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL'
  );
  return response.data;
}
