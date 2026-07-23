import { strapiGet } from '@/lib/strapi';
import type { GlobalDTO } from '@/types/pages';

export async function fetchGlobal(): Promise<GlobalDTO> {
  const response = await strapiGet<{ data: GlobalDTO }>(
    '/global' +
      '?populate[nav_links]=*' +
      '&populate[nav_cta]=*' +
      '&populate[header_logo][fields][0]=url' +
      '&populate[header_logo][fields][1]=alternativeText' +
      '&populate[header_logo][fields][2]=width' +
      '&populate[header_logo][fields][3]=height' +
      '&populate[footer_logo][fields][0]=url' +
      '&populate[footer_logo][fields][1]=alternativeText' +
      '&populate[footer_logo][fields][2]=width' +
      '&populate[footer_logo][fields][3]=height' +
      '&populate[footer_columns][populate][links][fields][0]=label' +
      '&populate[footer_columns][populate][links][fields][1]=url' +
      '&populate[footer_columns][populate][links][fields][2]=is_external'
  );
  return response.data;
}
