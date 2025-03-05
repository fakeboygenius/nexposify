import { OrderStatus, TableStatus, MenuItem, Order, Table, Category, UserProfile, UserRole, Customer, Reservation, ReservationStatus, PaymentStatus, PaymentMethod } from "@/lib/types";

export const currentUser: UserProfile = {
  id: "user1",
  name: "Ibrahim Kadri",
  role: UserRole.Admin,
  avatar: "/lovable-uploads/f84efadc-e2a6-40eb-a56d-7eb137e147a0.png",
  email: "ibrahim@culinatech.com",
};

export const menuCategories: Category[] = [
  { id: "cat1", name: "All Menu", icon: "🍽️", count: 154 },
  { id: "cat2", name: "Special", icon: "🌟", count: 12 },
  { id: "cat3", name: "Soups", icon: "🥣", count: 3 },
  { id: "cat4", name: "Desserts", icon: "🍰", count: 19 },
  { id: "cat5", name: "Chickens", icon: "🍗", count: 10 },
  { id: "cat6", name: "Breakfast", icon: "🍳", count: 12 },
  { id: "cat7", name: "Beef Dishes", icon: "🥩", count: 5 },
  { id: "cat8", name: "Biryani", icon: "🍚", count: 8 },
  { id: "cat9", name: "Chicken Dishes", icon: "🍗", count: 10 },
  { id: "cat10", name: "Desserts", icon: "🍰", count: 19 },
  { id: "cat11", name: "Dinner", icon: "🍽️", count: 8 },
  { id: "cat12", name: "Drinks", icon: "🥤", count: 15 },
  { id: "cat13", name: "Fast Foods", icon: "🍔", count: 25 },
  { id: "cat14", name: "Lunch", icon: "🥗", count: 20 },
  { id: "cat15", name: "Platters", icon: "🍱", count: 14 },
  { id: "cat16", name: "Salads", icon: "🥗", count: 8 },
  { id: "cat17", name: "Side Dishes", icon: "🍟", count: 4 },
  { id: "cat18", name: "Soups", icon: "🥣", count: 3 },
];

export const menuItems: MenuItem[] = [
  {
    id: "item1",
    name: "Grilled Salmon Steak",
    category: "Lunch",
    price: 15.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Freshly grilled salmon steak with herbs and lemon",
    available: true,
  },
  {
    id: "item2",
    name: "Tofu Poke Bowl",
    category: "Salad",
    price: 7.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Healthy bowl with tofu, rice, and fresh veggies",
    available: true,
  },
  {
    id: "item3",
    name: "Pasta with Roast Beef",
    category: "Pasta",
    price: 10.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Al dente pasta with tender roast beef and creamy sauce",
    available: true,
  },
  {
    id: "item4",
    name: "Beef Steak",
    category: "Beef",
    price: 30.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Premium beef steak cooked to perfection",
    available: true,
  },
  {
    id: "item5",
    name: "Shrimp Rice Bowl",
    category: "Rice",
    price: 6.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Flavorful rice bowl topped with seasoned shrimp",
    available: true,
  },
  {
    id: "item6",
    name: "Apple Stuffed Pancake",
    category: "Dessert",
    price: 35.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Fluffy pancake stuffed with caramelized apples",
    available: true,
  },
  {
    id: "item7",
    name: "Chicken Quinoa & Herbs",
    category: "Chicken",
    price: 12.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Healthy quinoa with chicken and fresh herbs",
    available: true,
  },
  {
    id: "item8",
    name: "Vegetable Shrimp",
    category: "Salad",
    price: 10.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Fresh vegetables with seasoned shrimp",
    available: true,
  },
  {
    id: "dessert1",
    name: "Cheese Syrniki Pancakes",
    category: "Dessert",
    subcategory: "Desserts",
    price: 8.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Traditional cheese pancakes served with sour cream and jam",
    available: true,
  },
  {
    id: "dessert2",
    name: "Apple Stuffed Pancake",
    category: "Dessert",
    subcategory: "Desserts",
    price: 10.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Fluffy pancake stuffed with caramelized apples",
    available: true,
  },
  {
    id: "dessert3",
    name: "Terracotta Bowl",
    category: "Dessert",
    subcategory: "Desserts",
    price: 12.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Assorted fruits and cream served in a terracotta bowl",
    available: true,
  },
  {
    id: "dessert4",
    name: "Croissant Dessert",
    category: "Dessert",
    subcategory: "Desserts",
    price: 15.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Buttery croissant with chocolate and cream",
    available: true,
  },
  {
    id: "dessert5",
    name: "Granola Banana & Berry",
    category: "Dessert",
    subcategory: "Desserts",
    price: 10.00,
    image: "https://images.pexels.com/photos/13573663/pexels-photo-13573663.jpeg",
    description: "Crunchy granola with fresh bananas and mixed berries",
    available: true,
  },
];

export const tables: Table[] = [
  { id: "table1", number: "#1", capacity: 6, status: TableStatus.Available, section: "Main Dining", area: "main" },
  { id: "table2", number: "#2", capacity: 2, status: TableStatus.Reserved, section: "Main Dining", area: "main" },
  { id: "table3", number: "#3", capacity: 2, status: TableStatus.Available, section: "Main Dining", area: "main" },
  { id: "table4", number: "#4", capacity: 3, status: TableStatus.Occupied, section: "Main Dining", area: "main" },
  { id: "table5", number: "#5", capacity: 2, status: TableStatus.Available, section: "Main Dining", area: "main" },
  { id: "table6", number: "#6", capacity: 7, status: TableStatus.Available, section: "Main Dining", area: "main" },
  { id: "table7", number: "#7", capacity: 10, status: TableStatus.Available, section: "Main Dining", area: "main" },
  { id: "table8", number: "#8", capacity: 2, status: TableStatus.Reserved, section: "Main Dining", area: "terrace" },
  { id: "table9", number: "#9", capacity: 4, status: TableStatus.Reserved, section: "Main Dining", area: "terrace" },
  { id: "table10", number: "#10", capacity: 2, status: TableStatus.Reserved, section: "Main Dining", area: "bar" },
  { id: "table11", number: "#11", capacity: 2, status: TableStatus.Available, section: "Main Dining", area: "bar" },
  { id: "table12", number: "#12", capacity: 8, status: TableStatus.Available, section: "Main Dining", area: "bar" },
];

export const activeOrders: Order[] = [
  {
    id: "order1",
    tableId: "table3",
    tableNumber: "03",
    status: OrderStatus.InKitchen,
    items: [
      { id: "oi1", menuItemId: "item1", name: "Menu Item", price: 10, quantity: 8 }
    ],
    total: 80,
    createdAt: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
    updatedAt: new Date(Date.now() - 1 * 60 * 1000),
  },
  {
    id: "order2",
    tableId: "table7",
    tableNumber: "07",
    status: OrderStatus.WaitList,
    items: [
      { id: "oi2", menuItemId: "item2", name: "Menu Item", price: 12, quantity: 3 }
    ],
    total: 36,
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 mins ago
    updatedAt: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "order3",
    tableId: "table9",
    tableNumber: "09",
    status: OrderStatus.Ready,
    items: [
      { id: "oi3", menuItemId: "item3", name: "Menu Item", price: 15, quantity: 2 }
    ],
    total: 30,
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 mins ago
    updatedAt: new Date(Date.now() - 5 * 60 * 1000),
  }
];

export const reservations: Reservation[] = [
  {
    id: "res1",
    tableId: "table2",
    customerName: "Uthman ibn Hunaif",
    customerPhone: "+84 678 890 000",
    guests: 6,
    time: new Date(2024, 0, 11, 19, 30), // Jan 11, 2024, 7:30 PM
    status: ReservationStatus.Confirmed,
    notes: "Dinner",
  },
  {
    id: "res2",
    tableId: "table8",
    customerName: "Bashir ibn Sa'ad",
    customerPhone: "+84 123 456 789",
    guests: 2,
    time: new Date(2024, 0, 11, 20, 0), // Jan 11, 2024, 8:00 PM
    status: ReservationStatus.Arrived,
    notes: "Special occasion",
  },
  {
    id: "res3",
    tableId: "table3",
    customerName: "Ali",
    customerPhone: "+84 342 556 555",
    guests: 2,
    time: new Date(2024, 0, 11, 20, 0), // Jan 11, 2024, 8:00 PM
    status: ReservationStatus.Confirmed,
    notes: "Dinner",
  },
  {
    id: "res4",
    tableId: "table9",
    customerName: "Khunais ibn Hudhafa",
    customerPhone: "+84 555 666 777",
    guests: 3,
    time: new Date(2024, 0, 11, 21, 0), // Jan 11, 2024, 9:00 PM
    status: ReservationStatus.Arrived,
    notes: "",
  },
  {
    id: "res5",
    tableId: "table5",
    customerName: "Available Now",
    customerPhone: "",
    guests: 0,
    time: new Date(),
    status: ReservationStatus.Confirmed,
    notes: "",
  },
  {
    id: "res6",
    tableId: "table6",
    customerName: "Mus'ab ibn Umayr",
    customerPhone: "+84 800 563 554",
    guests: 7,
    time: new Date(2024, 0, 11, 20, 25), // Jan 11, 2024, 8:25 PM
    status: ReservationStatus.Confirmed,
    notes: "Dinner",
  },
  {
    id: "res7",
    tableId: "table12",
    customerName: "Shuja ibn Wahb",
    customerPhone: "+84 900 100 200",
    guests: 10,
    time: new Date(2024, 0, 11, 21, 0), // Jan 11, 2024, 9:00 PM
    status: ReservationStatus.Confirmed,
    notes: "Dinner",
  },
];

export const customers: Customer[] = [
  {
    id: "cust1",
    name: "Uthman ibn Hunaif",
    phone: "+84 678 890 000",
    email: "uthman@example.com",
    visits: 5,
    totalSpent: 435.50,
    lastVisit: new Date(2024, 0, 5),
  },
  {
    id: "cust2",
    name: "Bashir ibn Sa'ad",
    phone: "+84 123 456 789",
    email: "bashir@example.com",
    visits: 3,
    totalSpent: 210.75,
    lastVisit: new Date(2024, 0, 8),
  },
  {
    id: "cust3",
    name: "Ali",
    phone: "+84 342 556 555",
    email: "ali@example.com",
    visits: 12,
    totalSpent: 1250.40,
    lastVisit: new Date(2024, 0, 10),
  },
  {
    id: "cust4",
    name: "Khunais ibn Hudhafa",
    phone: "+84 555 666 777",
    email: "khunais@example.com",
    visits: 2,
    totalSpent: 85.30,
    lastVisit: new Date(2024, 0, 11),
  },
  {
    id: "cust5",
    name: "Mus'ab ibn Umayr",
    phone: "+84 800 563 554",
    email: "musab@example.com",
    visits: 7,
    totalSpent: 690.15,
    lastVisit: new Date(2024, 0, 9),
  },
  {
    id: "cust6",
    name: "Shuja ibn Wahb",
    phone: "+84 900 100 200",
    email: "shuja@example.com",
    visits: 4,
    totalSpent: 305.25,
    lastVisit: new Date(2024, 0, 6),
  },
];

export const activeOrderDetails = {
  id: "ord12345",
  orderNumber: "#F0030",
  tableNumber: "#04",
  people: 2,
  items: [
    { id: "ordit1", name: "Pasta with Roast Beef", quantity: 2, price: 20.00 },
    { id: "ordit2", name: "Shrimp Rice Bowl", quantity: 2, price: 12.00 },
    { id: "ordit3", name: "Apple Stuffed Pancake", quantity: 1, price: 35.00 },
    { id: "ordit4", name: "Vegetable Shrimp", quantity: 1, price: 10.00 },
  ],
  subtotal: 67.00,
  tax: 4.00,
  donation: 1.00,
  total: 72.00,
  paymentMethod: PaymentMethod.Card
};
