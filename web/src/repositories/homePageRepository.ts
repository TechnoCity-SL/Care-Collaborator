import { strapiGet } from '@/lib/strapi';
import type { HomePageDTO } from '@/types/pages';

export async function fetchHomePage(): Promise<HomePageDTO> {
  const response = await strapiGet<{ data: HomePageDTO }>(
    '/home-page' +
      '?populate[partner_logos_section][populate][logos][fields][0]=url' +
      '&populate[partner_logos_section][populate][logos][fields][1]=alternativeText' +
      '&populate[partner_logos_section][populate][logos][fields][2]=width' +
      '&populate[partner_logos_section][populate][logos][fields][3]=height' +
      '&populate[video_file][fields][0]=url' +
      '&populate[video_file][fields][1]=alternativeText' +
      '&populate[video_file][fields][2]=width' +
      '&populate[video_file][fields][3]=height' +
      '&populate[hero_banner][populate][primary_cta]=*' +
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
      '&populate[hero_banner][populate][clouds][populate][image][fields][0]=url' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][2]=width' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][3]=height' +
      '&populate[stats_banner][populate][stats]=*' +
      '&populate[stats_banner][populate][bg_image][fields][0]=url' +
      '&populate[stats_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[stats_banner][populate][bg_image][fields][2]=width' +
      '&populate[stats_banner][populate][bg_image][fields][3]=height' +
      '&populate[features][fields][0]=title' +
      '&populate[features][fields][1]=description' +
      '&populate[features][fields][2]=icon_key' +
      '&populate[steps][fields][0]=title' +
      '&populate[steps][fields][1]=description' +
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
