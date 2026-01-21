# 🧊 Cold Coco E‑Commerce Platform — Master Production Prompt

> **Purpose**: This document is a **single‑source, production‑ready master prompt** to build a full‑stack e‑commerce platform using **Next.js + Node.js + MongoDB**, intended for real‑world selling of **Cold Coco Powder, Surat Famous Cold Coco Drink, and Mango Pulp**.
>
> This prompt is designed to be used with **Google Antigravity** or any advanced code‑generation workflow.

---

## 1. Project Overview

**Project Name**: Cold Coco Store
**Domain**: Food & Beverage E‑commerce
**Target Market**: India (initial), scalable globally

### Products

* Cold Coco Powder (packaged)
* Surat Famous Cold Coco Drink (fresh / made‑to‑order)
* Mango Pulp (seasonal)

### Core Goals

* Pixel‑perfect, fully responsive UI
* SEO‑optimized pages
* Full authentication & authorization
* Admin panel
* Zero broken routes (no accidental 404s)
* Production‑ready architecture
* PWA (mobile app‑like experience)

---

## 2. Tech Stack (Finalized)

### Frontend

* **Next.js (App Router)**
* React 18
* Tailwind CSS
* Framer Motion
* Redux Toolkit or Zustand
* React Hook Form + Zod

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

### Database

* MongoDB
* Mongoose

### Infrastructure & Services

* Cloudinary (images)
* Razorpay (payments)
* Nodemailer (emails)
* MongoDB Atlas
* Environment variables via dotenv

---

## 3. Design System & Theming (Critical Requirement)

### Global Color Control (Single Point of Change)

All colors **MUST** be controlled from one location only.

#### Brand Colors

* **Primary (Chocolate Brown)**: `#4E342E`
* **Secondary (Cream)**: `#FFF1DC`

### Implementation Rule

* Use **CSS variables OR Tailwind config**
* No hard‑coded colors anywhere in components

```css
:root {
  --color-primary: #4E342E;
  --color-secondary: #FFF1DC;
}
```

Tailwind must consume these variables. Changing brand colors must require editing **only one file**.

---

## 4. User Roles & Permissions

### Customer

* Register / Login
* Browse products
* Add to cart
* Place orders
* Leave reviews & ratings
* Track orders
* Manage profile

### Admin

* Secure admin login
* Dashboard analytics
* Manage products, orders, users
* Moderate reviews
* Control homepage content

---

## 5. Authentication & Authorization Flow

### Authentication Methods (Multiple Login Options)

The platform must support **three parallel login methods**:

1. **Password-based Login** (Email + Password)
2. **OTP-based Login** (Email OTP)
3. **Google OAuth Login**

All methods must result in a **unified JWT-based session**.

---

### Email Configuration (Non-Paid / Development Mode)

* All authentication-related emails must be sent from:

  * **[prasadcoldcoco@gmail.com](mailto:prasadcoldcoco@gmail.com)**
* Use **Nodemailer with Gmail SMTP**
* No paid email services required at this stage

Email use-cases:

* OTP login
* Forgot password
* Password reset confirmation
* Account security alerts

---

### Password-Based Authentication

* User registration with email & password
* Password hashing using bcrypt
* Secure login with JWT access + refresh tokens

---

### OTP-Based Authentication (Email OTP)

Flow:

1. User enters email
2. System generates 6-digit OTP
3. OTP sent to registered email
4. OTP verified
5. JWT session created

Rules:

* OTP expiry (5–10 minutes)
* Max retry limit
* One active OTP per user

---

### Google Login (OAuth)

* Use Google OAuth 2.0
* First-time login auto-creates user account
* Existing users can link Google account
* No password required for Google-auth users

---

### Forgot Password Flow

1. User clicks "Forgot Password"
2. Enters registered email
3. Secure reset link OR OTP sent via email
4. User sets new password
5. Confirmation email sent

---

### Change Password (Logged-in User)

* Requires current password verification
* New password validation
* Logout from all sessions after change

---

### Authorization

* Role-based access control (User / Admin)
* Middleware-protected routes
* Admin routes inaccessible to customers

---

## 6. SEO‑Friendly Architecture (Mandatory)

### SEO Requirements

* Server‑side rendering using Next.js
* Dynamic meta tags per page
* OpenGraph & Twitter cards
* Clean, readable URLs
* Sitemap generation
* Robots.txt

### SEO Pages

* Home
* Category pages
* Product detail pages
* Blog / content pages (optional)

---

## 7. Progressive Web App (PWA)

### PWA Features

* Installable on mobile
* Offline fallback page
* App‑like navigation
* Splash screen
* Service worker caching

### Behavior

* Works smoothly on low networks
* Home‑screen icon
* Fast reloads

---

## 8. User‑Side Functional Flow

### Home Page

* Hero banner (Cold Coco theme)
* Featured products
* Surat Famous Cold Coco highlight
* Seasonal Mango Pulp section
* Testimonials
* SEO‑optimized content blocks

### Product Listing

* Categories
* Filters (price, availability)
* Sorting
* Pagination

### Product Detail Page

* Image gallery
* Description & ingredients
* Price & stock
* Add to cart / Buy now
* Reviews & ratings section

### Reviews & Ratings

* Only verified buyers can review
* Star rating (1–5)
* Text review
* Admin moderation

### Review Abuse Protection

* You already have reviews, but add rules:
* One review per order per product
* Admin approve before publish
* Edit/delete review (limited time)

### Coupon & Offers System

* Flat / % discount
* Expiry date
* First-order coupon

### Cart

* Add / remove products
* Quantity updates
* Tax & delivery calculation

### Inventory Alerts

* Low stock email to admin
* Auto-disable out-of-stock products

### Checkout

* Address management
* Payment via Razorpay
* Order summary
* Confirmation page

### Orders

* Order history
* Status tracking
* Invoice download

### Profile

* Personal details
* Address book
* Password update

---

## 9. Admin Panel Features

### Dashboard

* Total revenue
* Orders count
* Daily / monthly charts
* Top products

### Product Management

* Create / edit / delete products
* Image uploads
* Category assignment
* Stock control

### Order Management

* View orders
* Update order status
* Cancel / refund

### Review Moderation

* Approve / reject reviews
* Remove spam

### User Management

* View users
* Block / unblock users
* Role control

### Content Management

* Homepage banners
* Testimonials
* Static pages (About, Contact)

---

## 10. Routing Strategy (Zero‑404 Policy)

### Rules

* All routes must be explicitly handled
* Custom, styled 404 page
* No broken links

### Strategy

* Central route config
* Catch‑all fallback
* Redirect invalid URLs

---

## 11. API Structure (High‑Level)

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`
* POST `/api/auth/forgot-password`
* POST `/api/auth/reset-password`

### Products

* GET `/api/products`
* GET `/api/products/:id`

### Reviews

* POST `/api/reviews`
* GET `/api/reviews/:productId`

### Orders

* POST `/api/orders`
* GET `/api/orders/user`

### Admin

* GET `/api/admin/dashboard`
* CRUD `/api/admin/products`
* GET `/api/admin/orders`
* GET `/api/admin/users`

---

## 12. Security (Production Mandatory)

* JWT authentication
* Role‑based authorization
* Input validation
* Rate limiting
* Secure headers
* Env‑based secrets
* No sensitive data in frontend

---

## 13. Local Development Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
npm install
npm run server
```

### Database

* MongoDB Atlas or local MongoDB

---

## 14. Production Deployment Guidelines

* Build optimized Next.js app
* Use environment‑specific configs
* Enable logging & error tracking
* Secure payment keys
* CDN for images

---

## 15. Quality Bar

This project must:

* Feel premium
* Load fast
* Be mobile‑first
* Be scalable
* Be business‑ready

**No demo‑level shortcuts allowed.**

---

## 16. Final Instruction for AI / Antigravity

> Build this project as a **real production e‑commerce platform**, following all constraints above.
> Prioritize **code quality, performance, SEO, security, and UX**.
> Output clean, maintainable, modular code suitable for long‑term growth.



-----


## ✅ What’s officially locked in

> Next.js (App Router)
> Full Auth System
> Password login
> Email OTP login
> Google OAuth login
> Forgot / Change password
> Gmail SMTP via prasadcoldcoco@gmail.com
> Admin Panel (complete)
> Product Reviews & Ratings
> SEO-first architecture
> PWA (installable, offline-ready)
> Zero-404 routing rule
> Single-point theme control
> Primary: Chocolate
> Secondary: Cream
> Production + Local setup
> Security best practices
> This is not a demo prompt — it’s something you could:
> Use for your own brand
> Sell as a custom solution
> Extend into a SaaS later

-------

## 🚀 How to use this with Google Antigravity (recommended flow)

> Open Google Antigravity
> Paste the entire prompt
> Ask Antigravity to:
> Generate folder structure first
> Then backend APIs
> Then auth flows
> Then admin panel
> Build feature-by-feature (don’t generate everything in one shot)