# Nada's Shop Dashboard: Technical Documentation

## 1. Project Goal

Nada's Shop is a frontend dashboard assessment built with Next.js, React, TypeScript, Tailwind CSS, Redux Toolkit, shadcn-style UI primitives, Recharts, and client-side export libraries.

The project demonstrates a complete authenticated dashboard workflow using mock data. It intentionally does not use a backend, Firebase, or API service. Authentication, orders, and chart data are local so the assessment can focus on frontend architecture and interaction quality.

Implemented requirements:

- Mock authentication with persistence
- Protected dashboard route
- Responsive dashboard shell and navigation
- Statistics cards and recent activity
- Searchable, filterable, sortable, paginated order table
- Responsive sales chart
- PDF and XLSX order export
- Production Docker setup

Future backend-backed data, advanced charts, or server-side exports are outside the current implementation.

## 2. Application Flow

```text
/login
  -> user enters credentials
  -> LoginForm validates fields
  -> users.json is searched
  -> Redux login action is dispatched
  -> user is persisted in localStorage
  -> router navigates to /dashboard

/dashboard
  -> StoreProvider hydrates Redux from localStorage
  -> dashboard waits until auth hydration completes
  -> unauthenticated users are redirected to /login
  -> authenticated users see the dashboard
  -> logout dispatches Redux logout and clears localStorage
```

The root route redirects to `/login`. The dashboard uses a client-side guard because this is mock authentication and there is no server session or backend middleware.

## 3. Authentication and Redux Toolkit

### Credentials

The mock user is defined in [data/users.json](data/users.json):

```json
[
  {
    "email": "admin@gmail.com",
    "password": "123456",
    "name": "Admin"
  }
]
```

`components/auth/LoginForm.tsx` performs required-field and email-format validation before searching this list. A user must match both the normalized email and password. A match dispatches `login({ email })`; a mismatch displays `Invalid email or password.`.

### Store

[store/store.ts](store/store.ts) creates the Redux store with the `auth` reducer:

```ts
configureStore({
  reducer: { auth: authReducer },
});
```

It exports:

- `RootState`: inferred state shape used by selectors
- `AppDispatch`: typed dispatch function used by components

### Auth slice

[features/auth/authSlice.ts](features/auth/authSlice.ts) uses `createSlice` and owns three state fields:

- `isAuthenticated`: whether a user is currently logged in
- `user`: the authenticated user's email or `null`
- `isHydrated`: whether localStorage has been read

Actions:

- `login`: stores the authenticated user
- `logout`: clears the user and authentication flag
- `hydrate`: restores a user from localStorage

Redux Toolkit uses Immer internally, so reducers can write state updates in a direct style while still producing immutable state updates.

### Provider and persistence

[components/providers/StoreProvider.tsx](components/providers/StoreProvider.tsx) is a client component placed around the application in [app/layout.tsx](app/layout.tsx).

`AuthPersistence`:

1. Reads the `pulseboard-auth` key from `window.localStorage` in `useEffect`.
2. Parses the stored user and dispatches `hydrate`.
3. Watches the hydrated auth state.
4. Writes the user back after login or removes the key after logout.

The `useEffect` boundary is important because `window` and `localStorage` do not exist during server rendering.

### Selectors and dispatch

Client components use React Redux hooks:

```ts
const user = useSelector((state: RootState) => state.auth.user);
const dispatch = useDispatch<AppDispatch>();
```

The login form dispatches `login`, while the dashboard dispatches `logout`. Both pages use the router only for navigation; authentication state remains owned by Redux.

## 4. Dashboard Structure

The dashboard is implemented in [app/dashboard/page.tsx](app/dashboard/page.tsx). It is a client component because it needs Redux state, router navigation, and the logout handler.

Main structure:

```text
SidebarProvider
  Sidebar
  SidebarInset
    DashboardHeader
    Dashboard content
      Overview heading
      StatCard grid
      OrdersTable
      SalesChart + recent activity
```

Important dashboard components:

| File | Responsibility |
| --- | --- |
| `app/dashboard/page.tsx` | Auth guard, logout flow, and page composition |
| `components/dashboard/Sidebar.tsx` | Nada's Shop navigation and user/logout footer |
| `components/dashboard/DashboardHeader.tsx` | Sidebar trigger, greeting, and notification affordance |
| `components/dashboard/BrandMark.tsx` | Reusable project logo mark |
| `components/dashboard/StatCard.tsx` | Reusable KPI card with typed color tones |
| `components/dashboard/OrdersTable.tsx` | Table controls, derived rows, and exports |
| `components/dashboard/SalesChart.tsx` | Recharts revenue visualization |
| `components/ui/sidebar.tsx` | shadcn-style sidebar provider and primitives |

## 5. Data Table Flow

### Mock data

[data/orders.ts](data/orders.ts) defines the `Order` type and twelve realistic mock orders. Each order includes:

- `id`
- `customer`
- `email`
- `date`
- `amount`
- `status`

`OrderStatus` is a TypeScript union of `Paid`, `Pending`, and `Refunded`.

### Search and filtering

`OrdersTable` stores `query` and `status` in local React state. A `useMemo` derives `filteredOrders` from the immutable mock list:

1. Normalize the search query to lowercase.
2. Search order ID, customer name, and email.
3. Apply the selected status filter.
4. Sort the matching results.

The search and status handlers reset the current page to page 1 so users do not land on an invalid page after narrowing the result set.

### Sorting

Sortable columns are represented by the `SortKey` union:

```ts
type SortKey = "id" | "customer" | "date" | "amount" | "status";
```

Clicking a column sets it as the active key. Clicking it again toggles ascending and descending order. The sort icon communicates the current direction.

### Pagination

The table displays five rows per page. `totalPages`, `currentPage`, and `visibleOrders` are derived from the filtered and sorted list. Previous and Next buttons are disabled at the boundaries.

The table is wrapped in `overflow-x-auto` and uses a minimum internal width so all columns remain usable on phones without creating page-level horizontal scrolling.

### Empty state

When no filtered rows exist, the table displays a clear `No orders found` state with guidance to change the search or filter.

## 6. Chart Implementation

[components/dashboard/SalesChart.tsx](components/dashboard/SalesChart.tsx) is a client component using Recharts:

- `ResponsiveContainer` adapts to the card width.
- `LineChart` renders the revenue series.
- `CartesianGrid` provides light horizontal guides.
- `XAxis` displays the seven dates.
- `YAxis` formats values as `$k` labels.
- `Tooltip` renders a themed revenue tooltip.
- `Line` uses the primary green theme color.

[data/sales.ts](data/sales.ts) provides typed seven-day data containing `date`, `revenue`, and `orders`. The current chart displays `revenue`; the typed `orders` value is available for future visualization without inventing a second chart in this phase.

## 7. PDF and XLSX Export

[lib/exportOrders.ts](lib/exportOrders.ts) contains browser-side export functions:

- `exportOrdersToExcel(orders)` uses `xlsx` to create a worksheet, set column widths, create a workbook, and download `nadas-shop-orders.xlsx`.
- `exportOrdersToPdf(orders)` uses `jspdf` and `jspdf-autotable` to create a landscape PDF with a branded title, export date, table header, alternating rows, and formatted currency values.

The export buttons live in `OrdersTable`. They receive `filteredOrders`, which means search, status filters, and sorting are reflected in the export. Pagination is intentionally not applied to exports, so the download contains the complete current result set rather than only the visible page.

The buttons are disabled when the filtered result set is empty.

## 8. Responsive Design

The application uses Tailwind responsive utilities and the shadcn-style sidebar primitives.

- Desktop: fixed sidebar, full dashboard content, two-column chart/activity section.
- Tablet: sidebar remains in the desktop layout while the content pane shrinks with `min-w-0`.
- Mobile: the sidebar becomes a sheet/drawer controlled by `SidebarTrigger`; dashboard sections stack vertically.
- Table: controls wrap and the table scrolls internally when the viewport cannot fit all columns.
- Forms: login inputs use full width, explicit labels, focus states, and accessible error messages.

`hooks/use-mobile.ts` uses `useSyncExternalStore` with `matchMedia` so the mobile sidebar can respond to viewport changes without setting state synchronously inside an effect or creating a server/client snapshot mismatch.

## 9. Docker Setup

[Dockerfile](Dockerfile) uses three stages:

1. `dependencies`: copies `package.json` and `package-lock.json`, then runs `npm ci`.
2. `builder`: copies dependencies and source, then runs `npm run build`.
3. `runner`: copies only `public`, `.next/standalone`, and `.next/static` into a smaller Node 22 Alpine runtime image.

The runner:

- Sets `NODE_ENV=production` and `PORT=3000`.
- Creates a non-root `nextjs` user.
- Exposes port 3000.
- Starts `node server.js`.

[next.config.ts](next.config.ts) sets `output: "standalone"`, which makes the minimal runtime copy possible.

[.dockerignore](.dockerignore) excludes dependencies, build output, Git metadata, logs, environment files, and other unnecessary context files.

Commands:

```bash
docker build -t nadas-shop-dashboard .
docker run --rm -p 3000:3000 nadas-shop-dashboard
```

No application environment variables are currently used.

## 10. Important Folders and Files

```text
app/
  layout.tsx                 Root metadata and Redux provider boundary
  page.tsx                   Redirects the root route to /login
  login/page.tsx             Login page presentation
  dashboard/page.tsx         Protected dashboard composition
  globals.css                Tailwind imports and theme variables

components/
  auth/LoginForm.tsx         Validation and mock credential lookup
  dashboard/                 Sidebar, header, cards, table, and chart
  providers/StoreProvider.tsx Redux provider and persistence
  ui/                        shadcn-style primitives and Button

data/
  users.json                 Mock login users
  orders.ts                  Typed order data
  sales.ts                   Typed chart data

features/auth/authSlice.ts   Redux Toolkit authentication slice
store/store.ts               Typed Redux store
lib/exportOrders.ts          XLSX and PDF export functions
hooks/use-mobile.ts          Responsive media-query subscription
Dockerfile                   Multi-stage production image
.dockerignore                Docker build context exclusions
```

## 11. Overall Architecture

The project follows a small feature-oriented App Router architecture:

```text
RootLayout
  StoreProvider
    AuthPersistence
    route content

LoginPage
  LoginForm
    users.json
    authSlice.login

DashboardPage
  auth selectors + route guard
  Sidebar / Header
  StatCards
  OrdersTable
    orders.ts
    exportOrders.ts
  SalesChart
    sales.ts
```

Server components are used for static route/page composition where practical. Client components are used where browser APIs, Redux hooks, router navigation, local state, Recharts, or file downloads are needed.

## 12. Git Flow

The project uses phase-oriented feature branches:

| Branch | Purpose |
| --- | --- |
| `main` | Main stable branch |
| `develop` | Integration branch |
| `feature/auth` | Mock authentication and persistence |
| `feature/dashboard` | Dashboard shell, sidebar, header, KPI cards |
| `feature/table` | Searchable, filterable, sortable, paginated table |
| `feature/chart` | Recharts sales visualization |
| `feature/export` | PDF and XLSX downloads |
| `feature/docker` | Production Docker setup |
| `feature/polish` | Responsive and accessibility fixes |
| `docs/readme` | Final project documentation |

Features are developed in isolated branches and are not merged automatically by the implementation workflow.

## 13. Technical Decisions

- **Mock authentication:** appropriate for an assessment without a backend; avoids unnecessary infrastructure.
- **Redux Toolkit for auth only:** authentication is shared across login and dashboard, while table and chart controls are local UI state.
- **`isHydrated` flag:** prevents a dashboard redirect before localStorage has been read.
- **Typed local data:** makes the mock data shape explicit and easy to replace with API responses later.
- **Derived table state:** search, filter, sort, and pagination are computed from one source list instead of duplicated state.
- **Client-side exports:** appropriate for mock data and keeps the export feature self-contained.
- **Next standalone output:** keeps the production Docker runtime small and does not require the full source tree.
- **Responsive internal table scrolling:** preserves column usability on mobile without causing page-level overflow.
- **`useSyncExternalStore`:** handles the responsive media-query subscription in a React-compatible way.

## 14. Interview Preparation

Be ready to explain:

1. Why `localStorage` access is inside `useEffect` and why the provider is a client component.
2. How Redux `dispatch`, reducers, selectors, and typed store exports work together.
3. Why `isHydrated` is needed before deciding whether `/dashboard` should redirect.
4. How `useMemo` derives filtered and sorted table data from source data.
5. Why pagination resets after a search or filter change.
6. How Recharts receives typed data and renders a responsive SVG chart.
7. Why exports use the full filtered/sorted result instead of only the current page.
8. How a multi-stage Docker build separates dependency installation, compilation, and runtime.
9. How `min-w-0`, responsive Tailwind classes, and internal table overflow prevent layout breakage.
10. Which pieces would move to an API, server actions, or a database in a production system.

## 15. Finished User Flow

1. The user opens the root route and is redirected to `/login`.
2. The login form validates the email and password fields.
3. The form finds a matching mock user in `data/users.json`.
4. Redux receives `login`, and `StoreProvider` persists the user to `localStorage`.
5. The user is routed to `/dashboard`.
6. The dashboard hydrates auth state and keeps the session through refresh.
7. The user reviews KPI cards, the sales chart, recent activity, and orders.
8. The user searches, filters, sorts, and paginates the order table.
9. The user exports the current filtered/sorted order set to XLSX or PDF.
10. The user opens the responsive sidebar on mobile or uses the desktop sidebar.
11. Logout dispatches `logout`, removes persisted auth, and returns the user to `/login`.
