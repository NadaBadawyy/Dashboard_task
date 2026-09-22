export type SalesPoint = {
  date: string;
  revenue: number;
  orders: number;
};

export const salesData: SalesPoint[] = [
  { date: "Sep 16", revenue: 2850, orders: 34 },
  { date: "Sep 17", revenue: 3420, orders: 41 },
  { date: "Sep 18", revenue: 3180, orders: 38 },
  { date: "Sep 19", revenue: 4260, orders: 52 },
  { date: "Sep 20", revenue: 3890, orders: 47 },
  { date: "Sep 21", revenue: 4720, orders: 59 },
  { date: "Sep 22", revenue: 5260, orders: 64 },
];