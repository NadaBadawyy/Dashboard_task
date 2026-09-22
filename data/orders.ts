export type OrderStatus = "Paid" | "Pending" | "Refunded";

export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: number;
  status: OrderStatus;
};

export const orders: Order[] = [
  { id: "ORD-1048", customer: "Olivia Martin", email: "olivia.martin@example.com", date: "2026-09-22", amount: 248.5, status: "Paid" },
  { id: "ORD-1047", customer: "Liam Johnson", email: "liam.johnson@example.com", date: "2026-09-22", amount: 86, status: "Pending" },
  { id: "ORD-1046", customer: "Sophia Williams", email: "sophia.williams@example.com", date: "2026-09-21", amount: 412.75, status: "Paid" },
  { id: "ORD-1045", customer: "Noah Brown", email: "noah.brown@example.com", date: "2026-09-21", amount: 129.99, status: "Paid" },
  { id: "ORD-1044", customer: "Emma Davis", email: "emma.davis@example.com", date: "2026-09-20", amount: 64.25, status: "Refunded" },
  { id: "ORD-1043", customer: "James Wilson", email: "james.wilson@example.com", date: "2026-09-20", amount: 319, status: "Paid" },
  { id: "ORD-1042", customer: "Ava Taylor", email: "ava.taylor@example.com", date: "2026-09-19", amount: 175.4, status: "Pending" },
  { id: "ORD-1041", customer: "William Anderson", email: "william.anderson@example.com", date: "2026-09-19", amount: 92.8, status: "Paid" },
  { id: "ORD-1040", customer: "Mia Thomas", email: "mia.thomas@example.com", date: "2026-09-18", amount: 560, status: "Paid" },
  { id: "ORD-1039", customer: "Benjamin Jackson", email: "benjamin.jackson@example.com", date: "2026-09-18", amount: 45.5, status: "Refunded" },
  { id: "ORD-1038", customer: "Isabella White", email: "isabella.white@example.com", date: "2026-09-17", amount: 214.2, status: "Paid" },
  { id: "ORD-1037", customer: "Lucas Harris", email: "lucas.harris@example.com", date: "2026-09-17", amount: 138.95, status: "Pending" },
];