# 🧊 Cold Coco E‑Commerce Platform — Phase 1: WhatsApp-First Edition

> **Purpose**: This is the **Phase 1 Master Prompt** for building the "Cold Coco Store" using **Next.js + Node.js + MongoDB**.
>
> **Core Strategy**: In Phase 1, we bypass the complex checkout/payment gateway flow. Instead, we implement a high-conversion **"Order via WhatsApp"** system. This allows customers to send structured order details directly to the business owner for manual fulfillment.

---

## 1. Project Overview

**Project Name**: Cold Coco Store (Phase 1)
**Domain**: Food & Beverage E‑commerce
**Target Market**: India (Local Delivery & Shipping)

### Key Change for Phase 1
*   **No Payment Gateway (Razorpay)**: Removed for now.
*   **No Traditional Checkout**: Replaced with WhatsApp Message Generator.
*   **Direct Engagement**: Customers chat directly with the owner to confirm orders.

### Products
*   Cold Coco Powder (packaged)
*   Surat Famous Cold Coco Drink (fresh / made‑to‑order)
*   Mango Pulp (seasonal)

### Core Goals
*   **High-End UI**: Must look like a premium brand (Pixel-perfect, responsive).
*   **Fast Action**: one-click "Order on WhatsApp".
*   **SEO‑Optimized**: Architecture ready for organic traffic.
*   **Admin Control**: Easy management of products and prices.

---

## 2. Tech Stack (Phase 1)

### Frontend
*   **Next.js (App Router)**
*   React 18
*   Tailwind CSS (Styling)
*   Framer Motion (Animations)
*   Lucide React (Icons)
*   Zustand (State Management - for cart/product selection)

### Backend
*   Node.js
*   Express.js
*   MongoDB + Mongoose
*   **Cloudinary** (Image management)

### Infrastructure
*   **WhatsApp API (Link Generator)**: `wa.me` links with URL-encoded text.
*   MongoDB Atlas
*   Environment Variables

---

## 3. Design System & Theming

### Global Color Control (Strict)
All colors **MUST** be controlled from `tailwind.config.js` or CSS variables.

#### Brand Palette
*   **Primary (Chocolate Brown)**: `#4E342E`
*   **Secondary (Cream)**: `#FFF1DC`
*   **Accent (WhatsApp Green)**: `#25D366` (Specific for CTA buttons)

---

## 4. User Roles & Permissions

### Customer (Simplified)
*   **Browse & Search**: View products without login.
*   **Direct Order**: Click "Order on WhatsApp".
*   *(Optional)* Login/Register: Not mandatory for Phase 1 purchasing, but good for saving "Favorites" or future tracking.

### Admin (Full Control)
*   **Secure Admin Login**: Mandatory.
*   **Product Management**: Add/Edit/Delete products, change prices, update "In Stock" status.
*   **Banner Management**: Change homepage sliders.

---

## 5. Functional Flow (The "WhatsApp Engine")

### A. Product Card / Detail Page
*   **Quantity Selector**: Users MUST be able to select quantity (e.g., 1, 2, 5, 10).
*   **Primary Action Button**: "Order via WhatsApp" (Styled with WhatsApp Green + Icon).
*   **Secondary Action**: "Ask a Question" (General query).

### B. The "Smart" WhatsApp Logic
When the user clicks the button, the system generates a deep link:
`https://wa.me/<YOUR_NUMBER>?text=<ENCODED_MESSAGE>`

**Message Format (Strictly Structured):**
```text
Hello Prasad Cold Coco! 👋
I would like to place an order:

📦 *Product*: Surat Famous Cold Coco Powder (500g)
🔢 *Quantity*: 2 Packets
💰 *Est. Total*: ₹600
🆔 *Ref ID*: #PROD-001

📍 *Action Required*:
Please confirm availability and delivery charges for my location.
```

### C. "Bulk Order" Cart (Mini-Cart)
*   Users can add multiple items to a "List".
*   The "Cart" page button changes to **"Send Order List via WhatsApp"**.
*   **Generated Message**:
    ```text
    Hi! I want to order multiple items:
    1. Cold Coco Powder (x2) - ₹600
    2. Mango Pulp (x1) - ₹300
    ----------------
    Total Est: ₹900
    ----------------
    Please confirm.
    ```

---

## 6. Admin Panel Features (Critical for Phase 1)

Since orders are manual, the Admin Panel is primarily for **Catalogue Management**.
*   **Product Dashboard**:
    *   Update Price (fluctuating rates).
    *   Toggle "Out of Stock" (instant reflection on frontend to stop messages).
    *   Update Images (Cloudinary).
*   **Homepage Control**:
    *   Update Banners (Festival specials).

---

## 7. SEO & Performance (Don't Compromise)

*   **Server-Side Rendering (SSR)**: Critical for Google ranking.
*   **Meta Tags**: Dynamic titles/descriptions/OG-Images for every product.
*   **Zero-Broken-Links**: Custom 404 page.
*   **Fast Loading**: Optimized images (Next/Image).

---

## 8. Security

*   **Admin Route Protection**: Middleware to block unauthorized access.
*   **Environment Variables**: Hide API keys and Mongo URIs.
*   **Sanitization**: Prevent basic XSS in product descriptions.

---

## 9. Phase 1 Deliverables Checklist

1.  **Landing Page**: High-impact visually, featuring "Surat Famous Cold Coco".
2.  **Product Catalog**: Grid view with "Order on WhatsApp" buttons.
3.  **Product Detail Page**: High-res images, Description, Quantity logic.
4.  **Admin Dashboard**: To manage the catalog.
5.  **WhatsApp "Smart Link" Generator**: The core logic utility.

---

## 10. Instruction for AI / Antigravity

> **Build this Phase 1 explicitly.**
> Focus on the **JavaScript logic for URL encoding** the WhatsApp messages correctly.
> Ensure the **Mobile UI** is flawless (sticky buttons, easy quantity tappables).
> Do NOT implement Razorpay or complex Order Database schemas for now (unless for Admin logs).
