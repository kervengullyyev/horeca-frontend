export type Category = {
  id: number;
  title: string;
  slug: string;
};

export type CategoryPageMetadata = {
  metaTitle: string;
  metaDescription: string;
};

export type CategorySlug = {
  slug: string;
};

export type SubCategoory = {
  id: number;
  title: string;
  products: Product[];
};

// Products

export type Product = {
  id: number;
  title: string;
  slug: string;
  mainImage: string;
  price: string;
};

export type ProductList = {
  id: number;
  title: string;
  slug: string;
  mainImage: string;
  brandTitle: string | null;
  price: string;
};

export type ProductPageMetadata = {
  title: string;
  description: string;
};

export type ProductImage = {
  id: number;
  image: string;
};

export type AttributeItem = {
  id: number;
  title: string;
  price: string | null;
  oldPrice: string | null;
  stock: number;
};

export type ProductAttribute = {
  title: string;
  items: AttributeItem[];
};

export type ProductDetail = {
  id: number;
  title: string;
  description: string | null;
  brandTitle: string | null;
  mainImage: string;
  images: ProductImage[];
  price: string | null;
  oldPrice: string | null;
  stock: number | null;
  attribute: ProductAttribute | null;
};

export type ProductSlug = {
  slug: string;
  categorySlug: string;
};

// Cart

export type CartProduct = {
  id: number;
  title: string;
  slug: string;
  mainImage: string;
  brandTitle: string | null;
  price: string;
  qty: number;
  attrItemId: number | null;
};

// Banners

export type Banner = {
  id: number;
  image: string;
  title: string;
  subTitle: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
};
