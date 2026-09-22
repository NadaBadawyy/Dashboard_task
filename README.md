# Nada's Shop Dashboard

Nada's Shop is a responsive Next.js dashboard assessment project with mock authentication, dashboard analytics, order management, chart visualization, PDF/XLSX export, and Docker support.

## Features

- Mock login with persisted authentication
- Protected dashboard route with Redux Toolkit
- Responsive shadcn-style sidebar and dashboard header
- KPI cards, sales chart, and recent activity panel
- Searchable, filterable, sortable, paginated orders table
- Export filtered and sorted orders to Excel and PDF
- Production Docker image using Next.js standalone output

## Tech Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Redux Toolkit and React Redux
- shadcn UI primitives with Base UI and Lucide icons
- Recharts
- `xlsx`, `jspdf`, and `jspdf-autotable`
- Docker with Node.js 22 Alpine

## Demo Login

```text
Email: admin@gmail.com
Password: 123456
```

Credentials are stored in [data/users.json](data/users.json) for this mock-only assessment implementation.

## Run Locally

Requirements: Node.js 22 or newer and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available commands:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

No environment variables are currently required.

## Docker

```bash
docker build -t nadas-shop-dashboard .
docker run --rm -p 3000:3000 nadas-shop-dashboard
```

Open [http://localhost:3000](http://localhost:3000). The Dockerfile uses a multi-stage build and runs the standalone Next.js server as a non-root user.

## Dashboard Highlights

The protected dashboard includes revenue, order, customer, and average-order-value statistics. The orders table supports search, status filtering, column sorting, pagination, empty results, and responsive horizontal scrolling on narrow screens. The sales chart displays seven days of mock revenue data with responsive axes and a tooltip.

Export buttons near the table download the complete filtered and sorted result set as `nadas-shop-orders.xlsx` or `nadas-shop-orders.pdf`.

## Implementation Summary

The App Router provides `/login` and protected `/dashboard` pages. Redux stores authentication state, while `StoreProvider` hydrates and persists the logged-in user through `localStorage`. Dashboard interaction state remains local to the table and chart components, keeping the mock data features independent and easy to replace with API data later.

The project was developed using Git Flow-style feature branches. `main` and `develop` are integration branches, while authentication, dashboard, table, chart, export, Docker, polish, and documentation work are isolated in feature branches.
