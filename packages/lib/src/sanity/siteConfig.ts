import { sanityClient } from "./client";

export const SITE_CONFIG_QUERY = `*[_type == "siteConfig"][0]{
  title,
  logo{asset->{_id, url}, alt},
  menu[]{title, url, internal},
  footer[]{title, links[]{label, url}},
  notificationBar{enabled, text, url, tone}
}`;

export async function fetchSiteConfig() {
  return sanityClient.fetch(SITE_CONFIG_QUERY);
}
