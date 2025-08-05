# 🛒 E-Commerce Catalog App

A full-stack product listing platform featuring faceted search, filters, pagination, and sorting — built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **Express**.

## 🔗 Live Links

- **Frontend**: [https://ecommerce-catalog-beryl.vercel.app/products](https://ecommerce-catalog-beryl.vercel.app/products)
- **Backend API**: [https://ecommerce-catalog-vxdu.onrender.com](https://ecommerce-catalog-vxdu.onrender.com)

---

## 🧩 Features

### ✅ Product Listing
- Paginated grid of products with images, name, price, and details

### ✅ Faceted Filtering
- Filter by category, brand, memory, color
- Price range slider (client debounced)
- Search bar for name/description match

### ✅ Sorting
- Sort by `price`, `name`, or `createdAt` in `asc` or `desc` order

### ✅ Pagination
- Client-side controls for page switching
- Displays limited page numbers (3 before & after current)

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Headless UI**
- `next/image`, `useSearchParams`, `useRouter`

### Backend
- **Node.js** with **Express.js**
- **Prisma ORM**
- **SQLite** (easy local setup) or **PostgreSQL** (production ready)
- RESTful API endpoints

---

## 🧪 Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-catalog.git
cd ecommerce-catalog
```

---

### 2. Start the Backend

```bash
cd backend
cp .env.example .env          # Add DATABASE_URL and other envs
npm install
npx prisma migrate dev        # Create schema and SQLite db
npm run seed                  # Seed sample data
npm run dev
```

Backend will start on `http://localhost:4000`.

---

### 3. Start the Frontend

```bash
cd frontend
cp .env.example .env          # Add NEXT_PUBLIC_API_URL pointing to backend
npm install
npm run dev
```

Frontend will start on `http://localhost:3000`.

---

## 📁 Folder Structure

```
frontend/
├── app/
│   └── products/             # Main products page
├── components/               # Reusable UI: Filters, ProductCard, etc.
├── lib/                      # API fetchers, debounce helpers
├── types/                    # TypeScript types

backend/
├── controllers/              # productController.js
├── routes/                   # productRoutes.js
├── prisma/                   # schema.prisma, seed.ts
├── scripts/                  # seed.js
├── index.js                  # Express entry point
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL="file:./dev.db" # Or your PostgreSQL URL
```

### Frontend (`frontend/.env`)
```env
NEXT_PUBLIC_API_URL="https://ecommerce-catalog-vxdu.onrender.com"
```

---

## 🚀 Deployment

### Frontend: [Vercel](https://vercel.com)
- Connect to GitHub
- Set `NEXT_PUBLIC_API_URL` in Vercel env settings
- Deploy via Vercel UI or CLI

### Backend: [Render](https://render.com)
- New Web Service → Select backend repo
- Set `DATABASE_URL` and other vars
- Auto deploy on push

---

## ✅ Assignment Coverage

- [x] API with filtering, sorting, pagination
- [x] Prisma + DB modeling with faceted attributes
- [x] Search & filter UX with debounce
- [x] Pagination with limited page display
- [x] Mobile-friendly UI with Tailwind
- [x] README with clear instructions ✅

---

## 🧠 Future Improvements

- Use PostgreSQL for production
- Add product detail page
- Use `@tanstack/react-query` for caching
- Add tests with Playwright / Jest

---

## 👨‍💻 Author

Built by Hitendra.
