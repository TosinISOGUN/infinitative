export type Role = "customer" | "vendor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  vendor: string;
  recentReviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  product: string;
  quantity: number;
  total: number;
  date: string;
  status: "delivered" | "processing" | "shipped" | "pending" | "cancelled";
}

export interface Purchase {
  id: string;
  userName: string;
  userId: string;
  product: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
  amount: number;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  products: number;
  revenue: number;
  joinedDate: string;
}
