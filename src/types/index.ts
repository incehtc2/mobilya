export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  discount_price: number | null;
  category_id: string | null;
  categories?: Category | null;
  images: string[];
  model_url: string | null;
  stock: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: ShippingAddress | null;
  role: "customer" | "admin";
  created_at: string;
}

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  stripe_payment_id: string | null;
  shipping_address: ShippingAddress | null;
  customer_email: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  products?: Product | null;
  quantity: number;
  price: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = "featured" | "price_asc" | "price_desc" | "newest";
export type ViewMode = "grid" | "list";
