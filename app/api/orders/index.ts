export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  mobile: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
}

export interface Order {
  id: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  orderDate: string;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
  order?: Order;
}

// Helper function to calculate order total
export const calculateOrderTotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Helper function to validate order data
export const validateOrderData = (data: Partial<Order>): string | null => {
  if (!data.customerDetails) return 'Customer details are required';
  if (!data.items?.length) return 'Order must contain at least one item';
  if (!data.total) return 'Order total is required';
  return null;
};

// Helper function to generate order ID
export const generateOrderId = (): string => {
  return `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
};