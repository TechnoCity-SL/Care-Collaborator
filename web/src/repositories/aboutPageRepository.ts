import { strapiGet } from '@/lib/strapi';
import type { AboutPageDTO } from '@/types/pages';

export async function fetchAboutPage(): Promise<AboutPageDTO> {
  const response = await strapiGet<{ data: AboutPageDTO }>(
    '/about-page' +
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
      '&populate[hero_banner][populate][clouds][populate][image][fields][0]=url' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][1]=alternativeText' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][2]=width' +
      '&populate[hero_banner][populate][clouds][populate][image][fields][3]=height' +
      '&populate[stats_banner][populate][stats]=*' +
      '&populate[stats_banner][populate][bg_image][fields][0]=url' +
      '&populate[stats_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[stats_banner][populate][bg_image][fields][2]=width' +
      '&populate[stats_banner][populate][bg_image][fields][3]=height' +
      '&populate[origin_section][populate][bg_image][fields][0]=url' +
      '&populate[origin_section][populate][bg_image][fields][1]=alternativeText' +
      '&populate[origin_section][populate][bg_image][fields][2]=width' +
      '&populate[origin_section][populate][bg_image][fields][3]=height' +
      '&populate[origin_section][populate][problem_items]=*' +
      '&populate[mission_section][populate][values][fields][0]=title' +
      '&populate[mission_section][populate][values][fields][1]=description' +
      '&populate[mission_section][populate][values][fields][2]=icon_key' +
      '&populate[mission_section][populate][bg_image][fields][0]=url' +
      '&populate[mission_section][populate][bg_image][fields][1]=alternativeText' +
      '&populate[mission_section][populate][bg_image][fields][2]=width' +
      '&populate[mission_section][populate][bg_image][fields][3]=height' +
      '&populate[diff_section][populate][features][fields][0]=title' +
      '&populate[diff_section][populate][features][fields][1]=description' +
      '&populate[diff_section][populate][features][fields][2]=icon_key' +
      '&populate[diff_section][populate][comparison_without]=*' +
      '&populate[diff_section][populate][comparison_with]=*' +
      '&populate[diff_section][populate][bg_image][fields][0]=url' +
      '&populate[diff_section][populate][bg_image][fields][1]=alternativeText' +
      '&populate[diff_section][populate][bg_image][fields][2]=width' +
      '&populate[diff_section][populate][bg_image][fields][3]=height' +
      '&populate[cta_banner][populate][primary_cta]=*' +
      '&populate[cta_banner][populate][secondary_cta]=*' +
      '&populate[cta_banner][populate][bg_image][fields][0]=url' +
      '&populate[cta_banner][populate][bg_image][fields][1]=alternativeText' +
      '&populate[cta_banner][populate][bg_image][fields][2]=width' +
      '&populate[cta_banner][populate][bg_image][fields][3]=height' +
      '&populate[seo][fields][0]=title' +
      '&populate[seo][fields][1]=description' +
      '&populate[seo][fields][2]=no_index' +
      '&populate[seo][fields][3]=canonicalURL'
  );
  return response.data;
}
