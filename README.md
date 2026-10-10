# Papertrail Books

A responsive React storefront for an independent online bookshop. The catalog includes category filters, title/author search, sorting, favorites, a demo shopping bag, and an order-history section with status filters and expandable tracking details.

## Project files

- `src/AppRouter.jsx` - shared cart state and URL routes.
- `src/pages/HomePage.jsx` - storefront and book catalog.
- `src/pages/OrdersPage.jsx` - order history and tracking details.
- `src/pages/CartPage.jsx` - cart, quantities, and totals.
- `src/components/` - shared site header and footer.
- `src/data/storeData.js` - book, category, and sample order data.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Create a production build with `npm run build`.

Product and storefront photography is loaded from Unsplash. Orders and tracking details are sample data; checkout and newsletter signup are front-end demos and are not connected to payment processing or an email service.