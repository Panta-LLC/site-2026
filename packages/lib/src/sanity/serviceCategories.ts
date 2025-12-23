import { sanityClient } from "./client";

export interface ServiceCategory {
  _id: string;
  title: string;
  value: string;
  order?: number;
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const query = `*[_type == "serviceCategory"] | order(order asc, title asc) {
    _id,
    title,
    value,
    order
  }`;
  try {
    const data = await sanityClient.fetch<ServiceCategory[]>(query);
    return data;
  } catch (e) {
    console.error("Error fetching service categories:", e);
    return [];
  }
}

export async function getServiceCategoryMap(): Promise<Record<string, ServiceCategory>> {
  const categories = await getServiceCategories();
  const map: Record<string, ServiceCategory> = {};
  
  categories.forEach((category) => {
    map[category.value] = category;
    map[category._id] = category; // Also map by ID for references
  });
  
  return map;
}

