import { strapiGet } from '@/lib/strapi';
import type { GlobalDTO } from '@/types/pages';

export async function fetchGlobal(): Promise<GlobalDTO> {
  const response = await strapiGet<{ data: GlobalDTO }>(
    '/global' +
      '?populate[nav_links]=*' +
      '&populate[nav_cta]=*' +
      '&populate[footer_columns][populate][links][fields][0]=label' +
      '&populate[footer_columns][populate][links][fields][1]=url' +
      '&populate[footer_columns][populate][links][fields][2]=is_external'
  );
  return response.data;
}
