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

export interface Order {
  id: string;
  product: string;
  quantity: number;
  total: number;
  date: string;
  status: "delivered" | "processing" | "shipped";
}

export const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Sports & Outdoor",
  "Health & Beauty",
  "Gadgets",
];

export const products: Product[] = [
  { id: "1", name: "Wireless Noise-Cancelling Headphones", price: 299.99, originalPrice: 349.99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", category: "Electronics", description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.", rating: 4.8, reviews: 1243, vendor: "AudioTech" },
  { id: "2", name: "Smart Fitness Watch Pro", price: 199.99, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80", category: "Gadgets", description: "Advanced fitness tracking with GPS, heart rate monitor, and 7-day battery life.", rating: 4.6, reviews: 892, vendor: "FitGear" },
  { id: "3", name: "Premium Leather Backpack", price: 149.99, originalPrice: 189.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80", category: "Fashion", description: "Handcrafted genuine leather backpack with laptop compartment and ergonomic design.", rating: 4.7, reviews: 567, vendor: "UrbanStyle" },
  { id: "4", name: "Minimalist Desk Lamp", price: 79.99, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&q=80", category: "Home & Kitchen", description: "Sleek LED desk lamp with adjustable brightness and color temperature.", rating: 4.5, reviews: 334, vendor: "HomeLux" },
  { id: "5", name: "Running Shoes Ultra Boost", price: 179.99, originalPrice: 219.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", category: "Sports & Outdoor", description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.", rating: 4.9, reviews: 2100, vendor: "SprintFit" },
  { id: "6", name: "Organic Skincare Set", price: 89.99, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80", category: "Health & Beauty", description: "Complete skincare routine with natural, organic ingredients.", rating: 4.4, reviews: 456, vendor: "GlowNatural" },
  { id: "7", name: "Bluetooth Speaker Portable", price: 59.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80", category: "Electronics", description: "Waterproof portable speaker with 360° sound and 12-hour playtime.", rating: 4.3, reviews: 789, vendor: "AudioTech" },
  { id: "8", name: "Ceramic Coffee Mug Set", price: 34.99, image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80", category: "Home & Kitchen", description: "Set of 4 handmade ceramic mugs with modern geometric designs.", rating: 4.6, reviews: 223, vendor: "HomeLux" },
];

export const purchases: Purchase[] = [
  { id: "PUR-001", userName: "Sarah Johnson", userId: "USR-1001", product: "Wireless Headphones", date: "2026-02-20", status: "completed", amount: 299.99 },
  { id: "PUR-002", userName: "Michael Chen", userId: "USR-1002", product: "Smart Fitness Watch", date: "2026-02-19", status: "completed", amount: 199.99 },
  { id: "PUR-003", userName: "Emma Davis", userId: "USR-1003", product: "Leather Backpack", date: "2026-02-18", status: "pending", amount: 149.99 },
  { id: "PUR-004", userName: "James Wilson", userId: "USR-1004", product: "Running Shoes", date: "2026-02-17", status: "completed", amount: 179.99 },
  { id: "PUR-005", userName: "Olivia Brown", userId: "USR-1005", product: "Desk Lamp", date: "2026-02-16", status: "cancelled", amount: 79.99 },
  { id: "PUR-006", userName: "Liam Garcia", userId: "USR-1006", product: "Bluetooth Speaker", date: "2026-02-15", status: "completed", amount: 59.99 },
  { id: "PUR-007", userName: "Sophia Martinez", userId: "USR-1007", product: "Skincare Set", date: "2026-02-14", status: "pending", amount: 89.99 },
  { id: "PUR-008", userName: "Noah Anderson", userId: "USR-1008", product: "Coffee Mug Set", date: "2026-02-13", status: "completed", amount: 34.99 },
];

export const vendors: Vendor[] = [
  { id: "VND-001", name: "AudioTech", email: "contact@audiotech.com", status: "active", products: 24, revenue: 45200, joinedDate: "2025-06-15" },
  { id: "VND-002", name: "FitGear", email: "hello@fitgear.com", status: "active", products: 18, revenue: 32100, joinedDate: "2025-07-20" },
  { id: "VND-003", name: "UrbanStyle", email: "info@urbanstyle.com", status: "active", products: 35, revenue: 58900, joinedDate: "2025-05-10" },
  { id: "VND-004", name: "HomeLux", email: "support@homelux.com", status: "inactive", products: 12, revenue: 15600, joinedDate: "2025-08-01" },
  { id: "VND-005", name: "SprintFit", email: "team@sprintfit.com", status: "active", products: 22, revenue: 41300, joinedDate: "2025-09-12" },
  { id: "VND-006", name: "GlowNatural", email: "care@glownatural.com", status: "pending", products: 8, revenue: 9800, joinedDate: "2025-11-05" },
];

export const orders: Order[] = [
  { id: "ORD-2001", product: "Wireless Headphones", quantity: 1, total: 299.99, date: "2026-02-20", status: "delivered" },
  { id: "ORD-2002", product: "Smart Fitness Watch", quantity: 1, total: 199.99, date: "2026-02-18", status: "shipped" },
  { id: "ORD-2003", product: "Premium Leather Backpack", quantity: 2, total: 299.98, date: "2026-02-15", status: "processing" },
  { id: "ORD-2004", product: "Running Shoes Ultra Boost", quantity: 1, total: 179.99, date: "2026-02-10", status: "delivered" },
];

export const dashboardMetrics = {
  admin: {
    totalUsers: 12847,
    totalPurchases: 8432,
    totalRevenue: 1247500,
    totalVendors: vendors.length,
    growth: 12.5,
  },
  vendor: {
    totalProducts: 24,
    totalOrders: 342,
    totalRevenue: 45200,
    pendingOrders: 18,
    growth: 8.3,
  },
};
