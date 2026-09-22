import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Order } from "@/data/orders";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function exportRows(orders: Order[]) {
  return orders.map((order) => ({
    Order: order.id,
    Customer: order.customer,
    Email: order.email,
    Date: formatDate(order.date),
    Amount: order.amount,
    Status: order.status,
  }));
}

export function exportOrdersToExcel(orders: Order[]) {
  const worksheet = XLSX.utils.json_to_sheet(exportRows(orders));
  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 22 },
    { wch: 34 },
    { wch: 16 },
    { wch: 14 },
    { wch: 14 },
  ];
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  XLSX.writeFile(workbook, "nadas-shop-orders.xlsx");
}

export function exportOrdersToPdf(orders: Order[]) {
  const document = new jsPDF({ orientation: "landscape" });
  document.setFontSize(18);
  document.setTextColor("#0A2540");
  document.text("Nada's Shop - Orders", 14, 16);
  document.setFontSize(9);
  document.setTextColor("#64748B");
  document.text(`Exported ${new Intl.DateTimeFormat("en-US").format(new Date())}`, 14, 23);

  autoTable(document, {
    startY: 30,
    head: [["Order", "Customer", "Email", "Date", "Amount", "Status"]],
    body: exportRows(orders).map((row) => [row.Order, row.Customer, row.Email, row.Date, `$${row.Amount.toFixed(2)}`, row.Status]),
    headStyles: { fillColor: "#1FA971", textColor: "#FFFFFF" },
    alternateRowStyles: { fillColor: "#F9FAFB" },
    styles: { textColor: "#0F172A", fontSize: 9 },
  });

  document.save("nadas-shop-orders.pdf");
}