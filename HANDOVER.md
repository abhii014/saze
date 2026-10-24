# 🌸 SAZÉ Store Handover & Setup Guide
*A complete step-by-step guide to taking ownership of your website, connecting it to Vercel, and running your daily store operations.*

---

## Part 1: Getting the Code on Your GitHub

You will need a free GitHub account to hold your website code.

### Step 1: Create a GitHub Account (If you don't have one)
1. Go to [github.com/signup](https://github.com/signup).
2. Enter your email, choose a password, and create your account.

### Step 2: Get the Repository into Your Account
There are two easy ways to do this:

#### Option A (Recommended — Direct Transfer from Your Friend):
1. Give your friend your **GitHub username**.
2. Your friend goes to the repository settings on GitHub (`Settings` -> scroll to the bottom `Danger Zone` -> click `Transfer Ownership`), types your username, and confirms.
3. You will receive an email notification — simply click **Accept Transfer**. The website repository is now 100% yours!

#### Option B (1-Click Fork):
1. Visit the repository link: [github.com/abhii014/saze](https://github.com/abhii014/saze).
2. In the top-right corner, click the **Fork** button.
3. Click **Create Fork**. A copy of the code is now saved directly under your GitHub account.

---

## Part 2: Deploying to Vercel (Going Live)

Vercel is the platform that hosts your website for free with high speed and automatic security (SSL).

### Step 1: Sign Up for Vercel with GitHub
1. Go to [vercel.com/signup](https://vercel.com/signup).
2. Select **Hobby (Free)**.
3. Click **Continue with GitHub** and authorize Vercel to access your GitHub.

### Step 2: Import Your Project
1. Once logged into your Vercel Dashboard, click the blue **"Add New…"** button in the top right, then select **Project**.
2. You will see a list of your GitHub repositories. Look for **`saze`** and click **Import**.

### Step 3: Configure Project Settings (IMPORTANT ⚠️)
Before clicking deploy, adjust these two quick settings:

1. **Root Directory**:
   - Look for the row that says **Root Directory**.
   - Click the **Edit** button next to it.
   - Select or type **`saze`** and click **Continue**.  
     *(This is very important because the website files are located inside the `saze` subfolder).*

2. **Environment Variables (Admin Password)**:
   - Expand the **Environment Variables** section.
   - In the **Key** field, type: `ADMIN_PASSWORD`
   - In the **Value** field, enter your desired admin password (e.g. `saze2026` or your own private password).
   - Click **Add**.

### Step 4: Click Deploy!
- Click the blue **Deploy** button.
- In about 45 to 60 seconds, confetti will burst on the screen! 🎉
- Vercel will give you your live website link (e.g., `https://saze-xyz.vercel.app`).

---

## Part 3: Connecting Your Custom Domain (Optional)

If you own a custom domain (like `saze.in` or `sazenails.com`):

1. In your Vercel project dashboard, click on **Settings** (top menu).
2. Click **Domains** in the left sidebar.
3. Type your domain name (e.g. `saze.in`) and click **Add**.
4. Vercel will display 2 DNS records (typically an `A` record and a `CNAME` record).
5. Open your domain provider (GoDaddy, Namecheap, Hostinger, etc.), go to **DNS Management**, and paste those two records.
6. Within a few minutes to a couple of hours, your custom domain will be active with free SSL security.

---

## Part 4: How to Run Your Store Everyday (Merchant Guide)

You do **not** need to touch any code to run your business. Everything is controlled through your secret Admin Portal.

### 1. Accessing Your Admin Portal
- Go to your website and add `/admin` to the end:
  ```text
  https://your-website-url.com/admin
  ```
- Enter your admin password (default: `saze2026`) and click **Unlock Portal**.

### 2. Toggling In-Stock vs. Out-of-Stock
When a press-on set or necklace sells out:
1. In `/admin`, find the product in your list.
2. Click the toggle switch next to **In Stock**.
3. It instantly flips to **Out of Stock** with a red badge on both your admin dashboard and the live shop.
4. When you restock, click it again to flip it back to **In Stock**!

### 3. Adding a New Product
1. In `/admin`, click the gold button **+ Add New Product**.
2. Fill in the details:
   - **Name**: e.g. *Golden Twilight*
   - **Tagline**: e.g. *Shimmering champagne with gold flakes*
   - **Price**: Selling price (e.g. `499`)
   - **Original Price**: Strike-through price for discounts (e.g. `699`)
   - **Category**: Select the category from your dropdown (Everyday, Bridal, Festive, etc.)
   - **Badge**: (Optional) Tag it as *New*, *Bestseller*, or *Limited Edition*
   - **Image URL**: Enter the image path or link
   - **Description**: Short description of the set
3. Click **Create Product**. It goes live instantly!

### 4. Adding or Deleting Categories
1. In `/admin`, click the **Manage Categories** button next to your category filter pills.
2. **To Add**: Type your new category name (e.g., *Rings*, *Summer Glow*, *Cocktail Sets*) and click **Add**.
   - It will automatically create the category and add it to both your `/admin` dropdowns and the customer-facing `/shop` filters!
3. **To Delete**: Click the red trash icon next to any category you no longer want. *(The default `'All'` category is protected).*

### 5. Backing Up Your Store Data
- Once a week or after making major updates, click the **Backup** button in your `/admin` dashboard.
- This immediately downloads a `.json` file to your computer containing all your products, descriptions, and prices for safe keeping.

---

## Part 5: How Customer Orders Work

Your website uses a seamless **Conversational Instagram Checkout** designed for Indian boutique commerce:

1. **Browsing**: Customer adds their favorite sets to the shopping bag.
2. **Checkout**: In the bag, they click **Order on Instagram**.
3. **Order Slip**: A luxury modal appears that automatically copies their clean, formatted order summary to their clipboard:
   ```text
   Hello SAZÉ! ✨
   I would like to order:
   - 1x Rose Quartz Velvet (₹499)
   - 1x Midnight Clover Chain (₹399)
   Subtotal: ₹898
   Could you confirm availability and sizing?
   ```
4. **Direct DM**: The site automatically opens the 1-on-1 Instagram DM thread with your account (`@_saze.in_`).
5. **Finalizing**:
   - The customer pastes the message.
   - You ask for their nail size (XS, S, M, L, or custom measurements) and delivery address.
   - You send your UPI ID or QR code.
   - Once payment is received, you pack and ship their order!

---

## 📞 Quick Checklist for Your Launch

- [ ] GitHub repository accepted/forked.
- [ ] Vercel account created and project imported with Root Directory set to `saze`.
- [ ] Environment variable `ADMIN_PASSWORD` added.
- [ ] Deployment completed successfully.
- [ ] Admin portal (`/admin`) tested by logging in and toggling a product stock.
- [ ] Test order placed from phone to verify Instagram DM launch.
