# 🍫 Cold Coco | Premium E-Commerce Platform - Lovable Master Prompt

This document is optimized for **Lovable (lovable.dev)**. It transforms the technical requirements of the Cold Coco project into high-context instructions for AI-driven development.

---

## 🚀 The "Phase 1" Kickstart Prompt
*Copy and paste this to start the project. This sets the design language and core architecture.*

> "I want to build a premium, high-end e-commerce store called **Cold Coco**. The brand is famous for its rich, Surat-style chocolate drinks and seasonal Mango Pulp.
>
> **Design Aesthetic:**
> - **Theme**: Luxury Food Brand. Primary: Chocolate Brown (#4E342E), Secondary: Warm Cream (#FFF1DC).
> - **Typography**: 'Poppins' for headings, 'Inter' for body.
> - **Visual Style**: Modern, sleek, glassmorphism elements, rounded-2xl corners, soft shadows, and smooth Framer Motion animations.
> 
> **Initial Scope:**
> 1. Create a stunning landing page with a hero section (Cold Coco splash effect), featured products, and customer testimonials.
> 2. Implement a responsive, glassmorphic header and a comprehensive footer (managed via state).
> 3. Build a 'Shop' page with category filters for: 'Cold Coco Powder', 'Fresh Drinks', and 'Mango Pulp'.
> 4. Ensure mobile-first responsiveness and high-quality placeholder images for luxury chocolate products.
>
> Use Lucide icons and Shadcn/UI components. Ask me any questions to clarify the brand vision before writing code."

---

## 🧠 The Project Knowledge Base (Paste into Lovable Knowledge or refer later)

### 1. 📂 Core Pages & User Flow
- **Home**: Brand storytelling, high-quality visuals, and top-selling products.
- **Product Listing**: Grid with sorting (Price/Popularity), search, and categories.
- **Product Details**: Multi-image gallery, ingredients, and verified buyer reviews.
- **Cart/Checkout**: Drawer-style cart, multi-step checkout via Razorpay integration.
- **User Profile**: Personal info, Address book, Order History, Invoice Downloads.
- **Static Pages**: About Us, Contact (with Google Map), Privacy Policy, Terms, etc.

### 2. 🔐 Advanced Authentication (Supabase)
- **Engine**: Supabase Auth (Native to Lovable).
- **Methods**: 
  - Password-based (Email/Pass).
  - OTP-based (Email OTP).
  - Google OAuth.
- **Security**: Role-based access (Customer vs. Admin).

### 3. 🛠️ Admin Panel (The Nerve Center)
- **Dashboard**: High-level charts for Sales (Last month vs. This month, Year-over-Year).
- **Inventory**: Full CRUD for products, images via Cloudinary.
- **Orders**: Manage status (Pending -> Shipped -> Delivered -> Cancelled).
- **Labels**: Button to 'Generate Shipping Label' (Sticker format for product boxes).
- **Users**: Admin-side table to View, Block/Unblock users, and see their histories.
- **Content**: Manage Homepage Banners, Footer details, and Testimonials.

### 4. ⭐ Features & UX
- **Reviews**: Only verified buyers can leave 1-5 star ratings + text.
- **Invoices**: PDF generation for customer invoices and admin shipping labels.
- **SEO**: Dynamic Meta titles/descriptions for every product.
- **PWA**: Fully installable mobile experience with offline fallback.
- **Emails**: Nodemailer/SMTP for OTPs and Order confirmations (prasadcoldcoco@gmail.com).

---

## 🎨 Design System Guide for Lovable
- **Colors**:
  - `--primary`: `#4E342E` (Chocolate Brown)
  - `--secondary`: `#FFF1DC` (Warm Cream)
  - `--accent`: `#8D6E63` (Light Cocoa)
  - `--background`: `#FAF7F5`
- **Rules**: 
  - No hard-coded colors; use Tailwind config or CSS variables.
  - Interactive elements must have micro-animations (hover scale, subtle lift).
  - Skeleton loaders for all data-fetching states.

---

## � Suggested Build Phases
1. **Phase 1**: Landing, Shop, and Product UI (Focus on Design).
2. **Phase 2**: Authentication (OTP/Google) and User Profile.
3. **Phase 3**: Shopping Cart, Checkout, and Payment Integration.
4. **Phase 4**: Admin Panel (Product & Order Management).
5. **Phase 5**: Analytics, Invoice Generation, and PWA setup.
