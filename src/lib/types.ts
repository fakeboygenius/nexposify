
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  image: string;
  description?: string;
  ingredients?: string[];
  preparationTime?: number;
  available: boolean;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  modifiers?: string[];
  specialInstructions?: string;
}

export interface Order {
  id: string;
  tableId: string;
  tableNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  customerName?: string;
}

export interface Table {
  id: string;
  number: string;
  capacity: number;
  status: TableStatus;
  section: string;
  area?: string; // Add area property with optional type
  currentOrderId?: string;
  reservationName?: string;
  reservationTime?: Date;
  reservationPhone?: string;
  guests?: number;
}

export interface Reservation {
  id: string;
  tableId: string;
  customerName: string;
  customerPhone: string;
  guests: number;
  time: Date;
  status: ReservationStatus;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  visits: number;
  totalSpent: number;
  favoriteDishes?: string[];
  notes?: string;
  lastVisit?: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
}

export enum OrderStatus {
  New = 'new',
  InKitchen = 'in-kitchen',
  Ready = 'ready',
  Served = 'served',
  Completed = 'completed',
  Cancelled = 'cancelled',
  WaitList = 'wait-list',
  DineIn = 'dine-in',
  TakeAway = 'take-away',
}

export enum TableStatus {
  Available = 'available',
  Reserved = 'reserved',
  Occupied = 'occupied',
}

export enum ReservationStatus {
  Confirmed = 'confirmed',
  Arrived = 'arrived',
  Cancelled = 'cancelled',
  NoShow = 'no-show',
}

export enum PaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Refunded = 'refunded',
}

export enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
  Mobile = 'mobile',
}

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Waiter = 'waiter',
  Cashier = 'cashier',
  Chef = 'chef',
}
