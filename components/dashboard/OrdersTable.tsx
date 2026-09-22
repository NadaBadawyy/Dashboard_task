"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  FileSpreadsheet,
  FileText,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { orders, type Order, type OrderStatus } from "@/data/orders";
import { exportOrdersToExcel, exportOrdersToPdf } from "@/lib/exportOrders";

type SortKey = "id" | "customer" | "date" | "amount" | "status";
type SortDirection = "asc" | "desc";

const PAGE_SIZE = 5;
const statuses: Array<"All" | OrderStatus> = [
  "All",
  "Paid",
  "Pending",
  "Refunded",
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function statusClass(status: OrderStatus) {
  if (status === "Paid") return "bg-secondary text-primary";
  if (status === "Pending") return "bg-orange/10 text-orange";
  return "bg-destructive/10 text-destructive";
}

export function OrdersTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | OrderStatus>("All");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return orders
      .filter((order) => {
        const matchesQuery =
          !normalizedQuery ||
          [order.id, order.customer, order.email].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          );
        return matchesQuery && (status === "All" || order.status === status);
      })
      .sort((first, second) => {
        const firstValue = first[sortKey];
        const secondValue = second[sortKey];
        const comparison =
          typeof firstValue === "number"
            ? firstValue - (secondValue as number)
            : String(firstValue).localeCompare(String(secondValue));
        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [query, sortKey, sortDirection, status]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateStatus(value: "All" | OrderStatus) {
    setStatus(value);
    setPage(1);
  }

  function toggleSort(nextKey: SortKey) {
    if (sortKey === nextKey)
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    else {
      setSortKey(nextKey);
      setSortDirection("asc");
    }
    setPage(1);
  }

  function sortIcon(column: SortKey) {
    if (sortKey !== column) return <ChevronsUpDown className="size-3.5" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="size-3.5" />
    ) : (
      <ArrowDown className="size-3.5" />
    );
  }

  return (
    <section className="rounded-xl border border-border bg-white shadow-sm shadow-navy/5">
      <div className="flex flex-col gap-5 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-semibold text-navy">Recent orders</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and review your latest customer orders.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <label className="relative block sm:min-w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search orders..."
              aria-label="Search orders"
              className="h-10 w-full rounded-lg border border-input bg-white pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
          <label className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={status}
              onChange={(event) =>
                updateStatus(event.target.value as "All" | OrderStatus)
              }
              aria-label="Filter by status"
              className="h-10 w-full appearance-none rounded-lg border border-input bg-white pl-9 pr-8 text-sm text-navy outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 sm:w-36"
            >
              <option value="All">All statuses</option>
              {statuses.slice(1).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={!filteredOrders.length}
              onClick={() => exportOrdersToExcel(filteredOrders)}
              title="Export filtered orders to Excel"
            >
              <FileSpreadsheet className="size-4 text-primary" /> Excel
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={!filteredOrders.length}
              onClick={() => exportOrdersToPdf(filteredOrders)}
              title="Export filtered orders to PDF"
            >
              <FileText className="size-4 text-orange" /> PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium sm:px-6">
                <button
                  type="button"
                  onClick={() => toggleSort("id")}
                  className="inline-flex items-center gap-1.5 hover:text-navy"
                >
                  Order {sortIcon("id")}
                </button>
              </th>
              <th className="px-5 py-3 font-medium sm:px-6">
                <button
                  type="button"
                  onClick={() => toggleSort("customer")}
                  className="inline-flex items-center gap-1.5 hover:text-navy"
                >
                  Customer {sortIcon("customer")}
                </button>
              </th>
              <th className="px-5 py-3 font-medium sm:px-6">
                <button
                  type="button"
                  onClick={() => toggleSort("date")}
                  className="inline-flex items-center gap-1.5 hover:text-navy"
                >
                  Date {sortIcon("date")}
                </button>
              </th>
              <th className="px-5 py-3 text-right font-medium sm:px-6">
                <button
                  type="button"
                  onClick={() => toggleSort("amount")}
                  className="ml-auto inline-flex items-center gap-1.5 hover:text-navy"
                >
                  Amount {sortIcon("amount")}
                </button>
              </th>
              <th className="px-5 py-3 font-medium sm:px-6">
                <button
                  type="button"
                  onClick={() => toggleSort("status")}
                  className="inline-flex items-center gap-1.5 hover:text-navy"
                >
                  Status {sortIcon("status")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
        {visibleOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Search className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-navy">No orders found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try changing your search or status filter to see more orders.
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 border-t border-border px-5 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>
          Showing {visibleOrders.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}{" "}
          to {Math.min(currentPage * PAGE_SIZE, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </span>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setPage((value) => value - 1)}
          >
            Previous
          </Button>
          <span className="min-w-20 text-center text-xs">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => value + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <tr className="transition-colors hover:bg-muted/30">
      <td className="px-5 py-4 font-medium text-navy sm:px-6">{order.id}</td>
      <td className="px-5 py-4 sm:px-6">
        <p className="font-medium text-navy">{order.customer}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{order.email}</p>
      </td>
      <td className="px-5 py-4 text-muted-foreground sm:px-6">
        {formatDate(order.date)}
      </td>
      <td className="px-5 py-4 text-right font-medium text-navy sm:px-6">
        {formatAmount(order.amount)}
      </td>
      <td className="px-5 py-4 sm:px-6">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClass(order.status)}`}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
}
