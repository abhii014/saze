# SAZÉ ✦ Master Autonomous AI Agent Prompt

> **Instructions for the AI Agent**:  
> You are an elite Full-Stack Next.js 15 Architect and Luxury E-Commerce Brand Designer.  
> Your task is to build, test, and deploy the complete **SAZÉ** luxury press-on nail and adornments website from scratch to production, followed by Git repository setup and Vercel edge deployment.  
> Follow the exact architecture, design tokens, data models, workflows, and verification steps detailed below.

---

## 1. Project Overview & Business Model

- **Brand Name**: SAZÉ (Tagline: *"A little luxury, delivered. / Because details matter."*)
- **Origin**: Handcrafted with precision in Goa, India. Pan-India shipping.
- **Product Offerings**: Luxury salon-quality reusable press-on nails (24 nails, 12 sizes per set, nail glue, prep pads, mini file) and artisanal gold-tone necklaces.
- **Commerce Model (Conversational Commerce)**:
  - No rigid payment gateway friction or transaction fees.
  - Customers browse collections, add items to a shopping bag, and generate an itemized **Instagram Order Slip** copied to their clipboard with 1 tap.
  - The website deep-links directly into the 1-on-1 Instagram DM thread with `@_saze.in_` via Meta's universal shortlink (`https://ig.me/m/_saze.in_`), where customer sizing, shipping details, and UPI payments are finalized personally.
- **Merchant Management**:
  - A password-protected `/admin` portal allowing the merchant to add/edit products, toggle live in-stock/sold-out status, manage categories dynamically, and download JSON backups.

---

## 2. Technical Stack & Tooling

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router with React Server Components + Client interactivity) |
| **Runtime & Language** | Node.js 18+ / TypeScript 5 (Strict type checking) |
| **Styling** | Tailwind CSS 3.4 / 4 with custom luxury CSS variables and glassmorphism |
| **Fonts** | Google Fonts via `next/font`: **Cormorant Garamond** (Serif) + **Jost** (Sans) |
| **Animations** | `framer-motion` (Page transitions, magnetic hovers, spring layout indicators) |
| **Icons** | `lucide-react` |
| **State Management** | React Context API with `localStorage` persistence (`CartContext`) |
| **Data Persistence** | Multi-tier: In-memory cache + Vercel KV / Upstash REST + Fallback `products.json` |
| **Deployment** | Git + Vercel Edge Network |

---

## 3. Brand Identity & Design System

### 3.1 Color Palette
Configure Tailwind and CSS variables in `app/globals.css`:
```css
:root {
  --background: #101526;        /* Deep Midnight Navy */
  --foreground: #f5f1e9;        /* Soft Pearl Cream */
  --card: #151b2e;              /* Elevated Card Background */
  --card-foreground: #f5f1e9;
  --border: rgba(212, 183, 121, 0.18); /* Subtle Gold Border */
  --gold: #d4b779;              /* Champagne Warm Gold */
  --gold-hover: #e2cb96;
  --navy: #101526;
  --navy-light: #1b233a;
  --cream: #f5f1e9;
  --muted: rgba(245, 241, 233, 0.6);
  --muted-foreground: rgba(245, 241, 233, 0.55);
}
```

### 3.2 Typography Tokens
- **Serif Display**: `font-serif` -> Cormorant Garamond (`weights: 300, 400, 500, 600, 700`)
- **Body & Sans UI**: `font-body` -> Jost (`weights: 300, 400, 500, 600`)
- **Fluid Heading Scale**:
  - Hero Title: `clamp(3.2rem, 5.5vw, 4.8rem)`
  - Display Title: `clamp(2.1rem, 3.8vw, 3.4rem)`
  - Section Eyebrow: `0.78rem` (12.5px), tracking `0.22em`, uppercase, gold accent.

### 3.3 Visual Effects
- **Glassmorphism**: `.glass-card { background: rgba(16, 21, 38, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(212, 183, 121, 0.12); }`
- **Gold Underline**: Animated width transition on hover.
- **Button System**:
  - `.button-primary`: Gold gradient background, dark navy text, subtle light sweep on hover, rounded-xl/full.
  - `.button-outline`: Transparent background, 1px gold border, cream text, gold border on hover.

---

## 4. Data Models & API Specifications

### 4.1 Product & Category Schema (`lib/products.ts`)
```typescript
export type Category = 'all' | 'everyday' | 'bridal' | 'festive' | 'necklaces' | 'custom' | (string & {})

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  category: string
  image: string
  images?: string[]
  badge?: 'bestseller' | 'new' | 'limited'
  description: string
  includes: string[]
  available: boolean
  featured?: boolean
}

export interface CategoryItem {
  value: string
  label: string
}
```

### 4.2 API Routes
1. **`GET /api/products`**: Returns active product catalog (JSON array).
2. **`GET /api/categories`**: Returns active category items (JSON array).
3. **`POST /api/admin/login`**: Authenticates merchant using password; sets HTTP-only secure cookie `saze_admin_auth=authenticated`.
4. **`POST /api/admin/products`**: Authenticated CRUD and stock toggle:
   - Action `'toggle_stock'`: Updates `available` flag.
   - Action `'add_product'`: Adds new product to catalog.
   - Action `'update_product'`: Updates existing product fields.
   - Action `'delete_product'`: Removes product from catalog.
5. **`POST /api/admin/categories`**: Authenticated category management:
   - Action `'add'`: Validates label, slugifies value (e.g. "Bridal Glow" -> "bridal-glow"), appends to list.
   - Action `'delete'`: Prevents deleting `'all'`, removes category by value.

---

## 5. Storefront & Component Architecture

### 5.1 Global Root Layout (`app/layout.tsx` & `app/template.tsx`)
- Anchor `<Navbar />` globally at `top: 0` with frosted glass backdrop blur (`backdrop-blur-md`).
- Mount `<Providers>` wrapping the application with `<CartProvider>`.
- Use `app/template.tsx` with `framer-motion` for subtle route-change fade-ins (`y: 12 -> 0`, opacity `0 -> 1`).

### 5.2 Navigation (`components/navbar.tsx`)
- Top announcement bar: *"A little luxury, delivered. ✦ Pan-India shipping"*.
- Sticky header containing SAZÉ logo, brand typography (`SAZÉ`), navigation links (*Home*, *The collection*, *Our story*, *Made for you*), direct Instagram link (*Let's talk ↗*), and shopping bag icon with dynamic badge counter.
- Mobile drawer with accessible focus trapping and keyboard escape handling.

### 5.3 Home Page (`app/page.tsx`)
Composed of 8 luxury modular sections:
1. **HeroSection**: Visual headline, luxury subtitle, shop collection CTA, and hero photography showcase with floating badges.
2. **MarqueeSection**: Infinite subtle gold marquee with core brand virtues: *Handmade with love • Reusable up to 5x • 10-minute application • Salon quality at home*.
3. **FeaturedSection**: Interactive category tab switcher with responsive product cards, price comparison, and hover micro-animations.
4. **WhySection**: 3 pillars of SAZÉ (Precision Craft, Reusable Luxury, Thoughtful Packaging).
5. **HowToOrderSection**: 3-step conversational commerce guide (1. Pick your set, 2. Copy order slip, 3. DM to confirm).
6. **BannerSection**: Editorial callout banner leading to custom nail orders.
7. **SocialSection**: Instagram community feed grid with direct `@_saze.in_` links.
8. **FaqSection**: Animated accordion answering sizing, application, longevity, shipping, and returns.

### 5.4 Shop Page & Product Details (`app/shop/page.tsx` & `app/shop/[slug]/page.tsx`)
- **Shop Client**: Dynamic category filter pills fetched live from `/api/categories`, search bar, sort dropdown (Featured, Price Low-High, Price High-Low, Name A-Z), and responsive product grid.
- **Product Detail**: Image preview gallery, price with discount tag, stock badge, includes checklist, sizing guidance, and 1-tap "Add to Bag" / "Order on Instagram" buttons.

### 5.5 Shopping Bag & Instagram Checkout (`components/cart/` & `components/instagram-checkout-modal.tsx`)
- Cart drawer/page displaying itemized quantities, price subtotals, free shipping eligibility, and order notes.
- **InstagramCheckoutModal**:
  - Modal container: `fixed inset-0 flex items-center justify-center overflow-hidden z-50`.
  - Body scroll-lock: `touch-action: none` applied to `document.body` to prevent mobile rubber-band scrolling.
  - Automatic clipboard copying: Automatically copies the formatted order summary:
    ```text
    Hello SAZÉ! ✨
    I would like to order:
    - 1x Rose Quartz Velvet (₹499)
    - 1x Midnight Clover Chain (₹399)
    Subtotal: ₹898
    Could you confirm availability and sizing?
    ```
  - Mobile Deep-Link: Launches `https://ig.me/m/_saze.in_` via `window.location.href`.
  - Desktop Fallback: Launches native Windows app `instagram://user?username=_saze.in_` or web DM fallback.

### 5.6 Admin Portal (`app/admin/page.tsx`)
- Lock screen requiring password authentication (`ADMIN_PASSWORD`).
- Live metric cards: Total Sets, In Stock, Out of Stock.
- Search and status filters (All, In Stock, Out of Stock).
- Dynamic category pills with **"Manage Categories"** modal trigger:
  - Add Category input with real-time slug creation.
  - List of active categories with product counts.
  - Delete category button with confirmation safeguard.
- Add/Edit Product Modal with image URL input, category select, pricing, and available checkbox.
- 1-Click JSON Backup button to export full catalog.

---

## 6. Agentic Execution Plan (Step-by-Step)

### Phase 1: Repository & Next.js Setup
1. Initialize Next.js 15 project:
   ```bash
   pnpm create next-app saze --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
   ```
2. Install dependencies:
   ```bash
   pnpm add framer-motion lucide-react clsx tailwind-merge
   ```

### Phase 2: Design Tokens & Typography
1. Setup Google Fonts in `app/layout.tsx` (`Cormorant_Garamond` and `Jost`).
2. Implement complete CSS variable palette, glassmorphism utilities, and fluid typography in `app/globals.css`.

### Phase 3: Core Lib & State
1. Create `lib/products.ts` with TypeScript interfaces and fallback product catalog.
2. Create `lib/products.json` with seed products.
3. Create `lib/cart-context.tsx` with React Context and `localStorage` persistence.
4. Create `lib/instagram.ts` with deep-link generators and slip formatting.
5. Create `lib/catalog-store.ts` with runtime caching and KV/persistence methods.

### Phase 4: Shared Layout & Navigation
1. Build `components/navbar.tsx` with sticky scroll tracking and mobile menu.
2. Build `components/footer.tsx` with brand values and social links.
3. Build `app/template.tsx` with framer-motion route transitions.

### Phase 5: Customer Pages
1. Build all 8 modular sections in `components/home/`.
2. Build `app/shop/page.tsx` and `components/shop/shop-client.tsx`.
3. Build `app/shop/[slug]/page.tsx` and product detail client.
4. Build `app/about/page.tsx`, `app/custom-order/page.tsx`, and `app/cart/page.tsx`.
5. Build `components/instagram-checkout-modal.tsx` with clipboard copy and mobile deep-linking.

### Phase 6: Admin Portal & APIs
1. Implement `app/api/products/route.ts` and `app/api/categories/route.ts`.
2. Implement `app/api/admin/login/route.ts`, `app/api/admin/products/route.ts`, and `app/api/admin/categories/route.ts`.
3. Build `app/admin/page.tsx` with login authentication, product CRUD, and category management modal.

### Phase 7: GitHub Setup & Push
1. Initialize Git repository:
   ```bash
   git init
   git add -A
   git commit -m "feat: complete luxury SAZÉ e-commerce storefront and admin portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/saze.git
   git push -u origin main
   ```

### Phase 8: Vercel Edge Deployment
1. Connect project to Vercel via CLI or Vercel Dashboard.
2. Configure settings:
   - Framework: **Next.js**
   - Root Directory: `saze` (if monorepo) or `./`
   - Build Command: `pnpm build`
   - Environment Variables:
     - `ADMIN_PASSWORD`: Your secret admin password (e.g. `saze2026`)
3. Assign production domain (e.g., `saze-nails.vercel.app`).

---

## 7. Verification Checklist

- [ ] `pnpm build` passes with 0 errors and 0 type warnings.
- [ ] Navbar stays firmly fixed at `top: 0` when scrolling without jitter.
- [ ] Cart counter updates immediately when items are added.
- [ ] Order slip formats correctly and copies to clipboard on checkout.
- [ ] On mobile, checkout opens `https://ig.me/m/_saze.in_` directly in Instagram app.
- [ ] Admin portal `/admin` requires password to unlock.
- [ ] Admin stock toggle immediately updates live product badges.
- [ ] Adding and deleting categories in `/admin` updates both the admin filters and `/shop` pills.
- [ ] Unused placeholder images and dead components are removed from repository.
