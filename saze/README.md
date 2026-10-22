# SAZÉ ✦ Luxury Press-On Nails & Adornments

> **A Little Luxury, Delivered.**  
> Handcrafted press-on nails and artisanal jewelry inspired by the coastal serenity of Goa. Built for modern conversational commerce with zero-friction Instagram checkout.

[![Live Store](https://img.shields.io/badge/Live%20Store-saze--nails.vercel.app-d4b779?style=for-the-badge&logo=vercel&logoColor=white)](https://saze-nails.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-15%20(App%20Router)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📖 Introduction: How the Website Was Made

SAZÉ was conceived and engineered from the ground up as a **bespoke, editorial luxury e-commerce experience**. 

Rather than adopting heavy, cookie-cutter platforms (like Shopify or WooCommerce) with recurring app subscriptions, rigid templates, and high payment-gateway transaction fees, SAZÉ is custom-architected around the fast-growing **Conversational Commerce** model popular in boutique beauty:

1. **Discovery & Curation**: Shoppers browse handcrafted sets categorized by mood (*Everyday*, *Bridal*, *Festive*, *Necklaces*), inspect high-resolution product photography, and view exact inclusions (nail sizes, glue, prep pads, care cards).
2. **One-Tap Bag & Slip Generation**: Customers add items to their shopping bag. Upon checkout, the website automatically formats an itemized, elegant **Instagram Order Slip** (listing exact set names, quantities, and subtotal) and copies it to their clipboard with one tap.
3. **Direct DM Handoff**: The site detects the customer's device and deep-links directly into the 1-on-1 Instagram DM thread with `_saze.in_` via Meta's universal shortlink (`https://ig.me/m/_saze.in_`) or desktop app protocol, where customer sizing, shipping details, and UPI payments are finalized personally.
4. **Autonomous Store Management**: An integrated, password-protected **Admin Portal (`/admin`)** empowers the business owner to add new products, toggle live in-stock/out-of-stock badges, manage categories dynamically, and download catalog backups without touching a single line of code.

---

## 🛠️ Tech Stack & What Was Used

The project was built using modern web development standards, balancing visual aesthetics with performance and accessibility:

### 1. Core Framework & Language
- **[Next.js 15 (App Router)](https://nextjs.org/)**: Leverages React Server Components (RSC) for fast initial page loads, SEO optimization, and Edge-ready API Route Handlers.
- **[React 19](https://react.dev/)**: Powers dynamic client-side interactions, modal portals, and state-driven UI updates.
- **[TypeScript](https://www.typescriptlang.org/)**: Ensures end-to-end type safety across catalog data models, cart items, API request/response payloads, and admin operations.

### 2. Styling & Luxury Visual Identity
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS configured with custom brand tokens:
  - **Color Palette**: Deep Midnight Navy (`#101526` / `var(--navy)`), Champagne Warm Gold (`#d4b779` / `var(--gold)`), and Soft Pearl Cream (`#f5f1e9` / `var(--cream)`).
  - **Glassmorphism**: Layered backdrop filters (`backdrop-blur-xl`, `bg-card/80`) and subtle gold borders (`border-gold/30`) evoking premium boutique packaging.
  - **Fluid Typography**: Responsive `clamp()` typography ensuring headings scale gracefully from small mobile screens to 4K displays.
- **Typography & Font System (`next/font/google`)**:
  - **Cormorant Garamond**: An elegant, high-contrast serif typeface used for hero headers, section titles, and brand logotypes.
  - **Jost**: A clean, geometric sans-serif typeface optimized for UI controls, navigation labels, and product descriptions.

### 3. Motion & Micro-Interactions
- **[Framer Motion](https://www.framer-motion.com/)**:
  - Smooth page reveals and exit animations via `<AnimatePresence>`.
  - Magnetic hover scaling on product cards, category pills, and call-to-action buttons.
  - Spring-animated navigation active indicator.
  - Soft sliding transitions for the mobile navigation drawer and checkout modal.

### 4. Iconography
- **[Lucide React](https://lucide.dev/)**: Lightweight vector icons (ShoppingBag, Lock, Tag, Trash, Edit, Check, Eye, Search, Sparkles) styled to match brand accents.

### 5. State Management & Data Architecture
- **React Context API (`CartContext`)**:
  - Manages real-time shopping bag state, item additions/removals, and quantity increments.
  - Persists customer cart state across sessions using browser `localStorage`.
- **Dynamic Catalog Store (`lib/catalog-store.ts`)**:
  - Dual-mode architecture supporting in-memory runtime caching, optional **Upstash Redis / Vercel KV** cloud persistence, and Git-backed persistence.
  - Includes client-side JSON export for 1-click catalog backups.

### 6. Conversational Instagram Deep-Linking
- **Universal Mobile Link**: Uses Meta's `https://ig.me/m/{username}` protocol to bypass intermediary browser prompts and launch directly into the private DM conversation on iOS and Android.
- **Desktop Native Fallback**: Uses `instagram://user?username={username}` with an automatic web fallback for laptops and desktops.

### 7. Deployment & Infrastructure
- **[Vercel Edge Platform](https://vercel.com/)**: Hosted with instant global edge caching, automated GitHub CI/CD, and custom production aliasing (`saze-nails.vercel.app`).

---

## 🌟 Key Features

| Feature | Description |
| :--- | :--- |
| **Sticky Navigation Bar** | Permanently anchored at `top: 0` with frosted glass backdrop blur (`backdrop-blur-md`), preventing layout shifts during scroll. |
| **Balanced Typography** | Refined typography hierarchy eliminating oversized text on mobile while enhancing micro-copy legibility (breadcrumbs, prices, specs). |
| **Centered Mobile Modal** | Fully centered viewport modal with background touch-scroll lock (`touch-action: none`) preventing page rubber-banding. |
| **Live Stock Toggling** | Instant 1-click switch in `/admin` to flip any set between *In Stock* and *Sold Out* across the entire storefront in real time. |
| **Dynamic Category Manager** | Create, rename, or delete categories directly from the admin portal; dynamically updates shop filters and product creation forms. |
| **Custom Order Studio** | Dedicated `/custom-order` portal guiding customers through reference sharing, custom sizing, and bespoke design briefs. |
| **Accessibility (a11y)** | Keyboard accessible modals with focus traps, escape-key dismissals, and screen-reader skip links (`#main-content`). |

---

## 📁 Project Structure

```text
saze/
├── app/
│   ├── about/              # Brand story & craft philosophy
│   ├── admin/              # Password-protected merchant dashboard
│   ├── api/
│   │   ├── admin/
│   │   │   ├── categories/ # Admin category add/delete endpoints
│   │   │   ├── login/      # Admin password & session auth
│   │   │   └── products/   # Catalog mutation (CRUD, stock toggle)
│   │   ├── categories/     # Public live categories API
│   │   └── products/       # Public live catalog API
│   ├── cart/               # Shopping bag & Instagram slip generator
│   ├── custom-order/       # Bespoke design inquiry workflow
│   ├── shop/               # Filterable product catalog & detail views
│   ├── globals.css         # Luxury design tokens, keyframes, scrollbars
│   └── layout.tsx          # Root layout, persistent Navbar & Footer
├── components/
│   ├── home/               # Modular landing page sections (Hero, Featured, etc.)
│   ├── shop/               # Client-side filtering & product cards
│   ├── cart/               # Bag client & Instagram order modal
│   ├── navbar.tsx          # Fixed glassmorphism navigation header
│   └── footer.tsx          # Brand footer with policies & social links
├── lib/
│   ├── catalog-store.ts    # Server-side catalog & category persistence
│   ├── cart-context.tsx    # Client cart state & localStorage sync
│   ├── products.ts         # TypeScript interfaces & helper utilities
│   ├── products.json       # Seed catalog dataset
│   └── instagram.ts        # Instagram deep-link formatting helpers
└── public/
    └── images/             # Product photography & brand identity assets
```

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.18 or newer recommended)
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

### Installation & Run

1. Clone the repository:
   ```bash
   git clone https://github.com/abhii014/saze.git
   cd saze/saze
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Portal Access

The administration portal is available at `/admin`:
- **URL**: `https://saze-nails.vercel.app/admin`
- **Default Credentials**: Protected by merchant passphrase (configured via `ADMIN_PASSWORD` environment variable, default `saze2026`).

---

## 📄 License

All original design assets, product photography, and brand likeness are proprietary to **SAZÉ**.  
Code architecture is licensed under the [MIT License](LICENSE).
