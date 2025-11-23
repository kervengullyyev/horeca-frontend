import { notFound } from "next/navigation";
import {
  Banner,
  Category,
  CategoryPageMetadata,
  CategorySlug,
  ProductDetail,
  ProductList,
  ProductPageMetadata,
  ProductSlug,
  SubCategoory,
} from "./types";

// Categories

export async function getCategories(locale: string) {
  const res = await fetch(`${process.env.API_URL}/categories`, {
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ["categories", `categories-${locale}`],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: Category[] = await res.json();

  return data;
}

export async function getCategoryPageMetadata(locale: string, slug: string) {
  const res = await fetch(
    `${process.env.API_URL}/categories/${slug}/metadata`,
    {
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        tags: ["categories", `category-${slug}-${locale}-metadata`],
      },
    },
  );

  if (!res.ok) {
    return notFound();
  }

  const data: CategoryPageMetadata = await res.json();

  return data;
}

export async function getCategorySlugs() {
  const res = await fetch(`${process.env.API_URL}/categories/slugs`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ["categories", "category-slugs"],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: CategorySlug[] = await res.json();

  return data;
}

export async function getCategoryPage(locale: string, slug: string) {
  const res = await fetch(`${process.env.API_URL}/categories/${slug}/page`, {
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ["categories", `category-${slug}-${locale}-page`],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: SubCategoory[] = await res.json();

  return data;
}

// Products

export async function getProductPageMetadata(locale: string, slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}/metadata`, {
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: [`product-${slug}-${locale}-metadata`],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: ProductPageMetadata = await res.json();

  return data;
}

export async function getProductDetail(locale: string, slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}`, {
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: [`product-${slug}-${locale}`],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: ProductDetail = await res.json();

  return data;
}

export async function getProductSlugs() {
  const res = await fetch(`${process.env.API_URL}/products/slugs`, {
    headers: { "Content-Type": "application/json" },
    cache: "force-cache",
    next: {
      tags: ["product-slugs"],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: ProductSlug[] = await res.json();

  return data;
}

export async function getAllProducts(locale: string) {
  const res = await fetch(`${process.env.API_URL}/products`, {
    headers: {
      "Accept-Language": locale,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ["products"],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: ProductList[] = await res.json();

  return data;
}

export async function getBanners() {
  const res = await fetch(`${process.env.API_URL}/banners`, {
    headers: { "Content-Type": "application/json" },
    // cache: "force-cache",
    next: {
      tags: ["banners"],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: Banner[] = await res.json();

  return data;
}

export async function getSubBanners() {
  const res = await fetch(`${process.env.API_URL}/sub_banners`, {
    headers: { "Content-Type": "application/json" },
    // cache: "force-cache",
    next: {
      tags: ["sub-banners"],
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data: Banner[] = await res.json();

  return data;
}
