import { sanityClient } from "./client";

/**
 * Service Category Queries
 */
export async function getAllServiceCategories() {
  const query = `*[_type == "serviceCategory" && !(_id match "drafts.*")] | order(order asc, title asc) {
    _id,
    title,
    value,
    description,
    order,
    previewImage{
      asset->{
        _id,
        url
      },
      alt
    },
    mainHeading
  }`;
  try {
    const data = await sanityClient.fetch(query);
    return data || [];
  } catch (e) {
    return [];
  }
}

export async function getCategoryByValue(slug: string) {
  const query = `*[_type == "serviceCategory" && value == $slug && !(_id match "drafts.*")][0]{
    _id,
    title,
    value,
    description,
    heroHeading,
    heroDescription,
    overview,
    benefits[]{
      _key,
      title,
      description,
      icon
    },
    process,
    sections[]{
      type,
      heading,
      content,
      buttonText,
      buttonLink,
      serviceList,
      benefits[]{
        _key,
        title,
        description,
        icon
      },
      services[]->{
        _id,
        title,
        category->{
          _id,
          title,
          value
        },
        description,
        slug
      },
      serviceCategories[]->{
        _id,
        title,
        value,
        description
      }
    },
    seo,
    ctaHeading,
    ctaContent,
    ctaButtonText
  }`;
  try {
    const data = await sanityClient.fetch(query, { slug });
    return data || null;
  } catch (e) {
    return null;
  }
}

/**
 * Service Queries
 */
export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug && !(_id match "drafts.*")][0]{
    _id,
    title,
    category->{
      _id,
      title,
      value
    },
    description,
    slug,
    isPrimary,
    content,
    sections[]{
      type,
      heading,
      content,
      buttonText,
      buttonLink,
      benefits[]{
        _key,
        title,
        description,
        icon
      },
      services[]->{
        _id,
        title,
        category->{
          _id,
          title,
          value
        },
        description,
        slug
      },
      serviceCategories[]->{
        _id,
        title,
        value,
        description
      },
      serviceList
    },
    seo
  }`;
  try {
    const data = await sanityClient.fetch(query, { slug });
    // Handle weak reference - category might be null if deleted
    if (data && !data.category) {
      console.warn(`Service ${data.title} has a missing category reference`);
    }
    return data || null;
  } catch (e) {
    return null;
  }
}

export async function getServicesByCategory(categoryValue: string) {
  const query = `*[_type == "service" && category->value == $categoryValue && !(_id match "drafts.*")] | order(isPrimary desc, title asc) {
    _id,
    title,
    category->{
      _id,
      title,
      value
    },
    description,
    slug,
    isPrimary,
    content,
    sections[]{
      type,
      heading,
      content,
      buttonText,
      buttonLink,
      serviceList,
      benefits[]{
        _key,
        title,
        description,
        icon
      },
      services[]->{
        _id,
        title,
        category->{
          _id,
          title,
          value
        },
        description,
        slug
      },
      serviceCategories[]->{
        _id,
        title,
        value,
        description
      }
    }
  }`;
  try {
    const data = await sanityClient.fetch(query, { categoryValue });
    return data || [];
  } catch (e) {
    return [];
  }
}

/**
 * Page Queries
 */
export async function getHomepage() {
  const query = `*[_type == "page" && slug.current == "home" && !(_id match "drafts.*")][0]{
    title,
    sections[]{
      type,
      heading,
      content,
      buttonText,
      buttonLink,
      serviceList,
      benefits[]{
        _key,
        title,
        description,
        icon
      },
      steps[]{
        _key,
        title,
        description,
        icon
      },
      goodFit,
      notGoodFit,
      services[]->{
        _id,
        title,
        category,
        description,
        slug
      },
      serviceCategories[]->{
        _id,
        title,
        value,
        description
      },
      slides[]{
        _key,
        subheading,
        title,
        description,
        linkTitle,
        customLink,
        order,
        contentReference->{
          _type,
          _id,
          title,
          slug,
          "slugValue": slug.current,
          value
        }
      }
    }
  }`;
  try {
    const data = await sanityClient.fetch(query);
    if (!data) {
      console.warn("Homepage not found in Sanity. Make sure a page with slug 'home' exists.");
    }
    return data || null;
  } catch (e: any) {
    // Check if it's a dataset error
    if (e?.response?.body?.message?.includes("Dataset") && e?.response?.body?.message?.includes("not found")) {
      console.error(
        `Sanity dataset error: ${e.response.body.message}. ` +
        `Please check that NEXT_PUBLIC_SANITY_DATASET is set correctly in your environment variables. ` +
        `It should be "production" (or your production dataset name), not "local".`
      );
    } else {
      console.error("Error fetching homepage from Sanity:", e);
    }
    return null;
  }
}

export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug && !(_id match "drafts.*")][0]{
    title,
    slug,
    description,
    content,
    sections[]{
      type,
      heading,
      content,
      buttonText,
      buttonLink,
      serviceList,
      benefits[]{
        _key,
        title,
        description,
        icon
      },
      services[]->{
        _id,
        title,
        category,
        description,
        slug
      },
      serviceCategories[]->{
        _id,
        title,
        value,
        description
      },
      slides[]{
        _key,
        subheading,
        title,
        description,
        linkTitle,
        customLink,
        order,
        contentReference->{
          _type,
          _id,
          title,
          slug,
          "slugValue": slug.current,
          value
        }
      }
    },
    seo
  }`;
  try {
    const data = await sanityClient.fetch(query, { slug });
    return data || null;
  } catch (e) {
    return null;
  }
}

export async function getMissionPage() {
  const query = `*[_type == "page" && slug.current == "mission" && !(_id match "drafts.*")][0]{
    title,
    description,
    slug,
    content,
    sections[]{
      type,
      heading,
      content,
      buttonText,
      buttonLink,
      serviceList,
      benefits[]{
        _key,
        title,
        description,
        icon
      },
      services[]->{
        _id,
        title,
        category,
        description,
        slug
      },
      serviceCategories[]->{
        _id,
        title,
        value,
        description
      }
    },
    seo
  }`;
  try {
    const data = await sanityClient.fetch(query);
    return data || null;
  } catch (e) {
    return null;
  }
}
