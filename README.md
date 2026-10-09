# DC Complex Hamirpur Website & Web Application

A modern, responsive web application faithfully recreated from the **Google Stitch** project (`DC Complex Hamirpur Website`, Project ID: `5346587664367644400`), optimized for **both Mobile devices and Desktop Web browsers**.

---

## 🏔️ Project Overview

**DC Complex** is a roadside residential living, fitness, and retail destination located in **Hamirpur, Himachal Pradesh** (Near Bus Stand Zone).

### Core Sections & Screens:
1. **Overview / Home (`index.html#home`)**:
   - Hero showcase with Himalayan mountain view residence visuals
   - Live availability badge (*3 Rooms Left*) & Govt. Registration status
   - The 3 Pillars: Residential Suites, In-House Fitness Club, Ground-Floor Grocery Mart
   - 8 Living Conveniences (HPSEBL digital submeter, high-speed fiber Wi-Fi, 24/7 hot water geyser, Swiggy/Zomato delivery, roadside parking, CCTV & power backup, RO drinking water, zero curfews)
   - Reception & Owner profile modal with direct dialing (`+91 62300 13209`) and Google Maps directions

2. **Rooms & Rent Tiers (`rooms.html` / `index.html#rooms`)**:
   - **Deluxe Room with Balcony** (₹8,500/month) — *Most Popular Choice* (Pine-view walkout balcony, ensuite geyser, hi-speed Wi-Fi)
   - **Standard Furnished Room** (₹6,500/month) — *Budget Friendly* (Dark oak box bed, ensuite geyser, study desk)
   - **Studio Suite with Kitchenette** (₹11,000/month) — *Self-Contained Living* (Granite kitchenette, induction setup, workstation)
   - Schedule Viewing & WhatsApp booking integration

3. **DC Fitness Club (`gym.html` / `index.html#gym`)**:
   - Commercial-grade in-house gym on 1st & 2nd floors (*Zero Winter Commute*)
   - Motorized treadmills, squat rack, heavy dumbbells (2.5kg – 35kg), dual cable cross
   - Daily passes (₹50), tenant subsidized monthly membership (₹600/month - *50% resident perk*), and non-resident public passes (₹1,200/month)
   - Operating hours: 6:00 AM – 10:00 PM daily

4. **Daily Grocery Mart (`grocery.html` / `index.html#grocery`)**:
   - Ground-floor convenience store open 7:30 AM – 10:00 PM daily
   - Fresh Verka & Amul dairy, bread, eggs, packaged snacks, toiletries, and college stationery
   - Resident Privileges: **10-minute WhatsApp room delivery** and **Monthly rent tab ledger**

5. **Community Guidelines & Modals**:
   - Quiet hours (10:30 PM – 6:30 AM), daytime visitor rules, waste segregation, no smoking indoors, HPSEBL submetering transparency

---

## 📱 Mobile + 💻 Desktop Responsive Experience

- **On Mobile (< 768px)**:
  - Native app-like feel with a fixed top app bar, smooth bottom navigation bar (`Home`, `Rooms`, `Fitness`, `Mart`, `Desk`), and thumb-friendly touch targets.
- **On Desktop (>= 768px)**:
  - Expands to a clean 12-column layout (`max-w-7xl`) with a desktop navigation header, side-by-side room cards, and feature grids.
  - **Phone Preview Mode Switcher**: Desktop users can toggle between full "Web View" and "Phone Preview" mode at any time using the toggle in the top-right header.

---

## 🚀 Running the Project

### Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Standalone (Zero Install):
You can also directly open `index.html`, `rooms.html`, `gym.html`, or `grocery.html` in any modern web browser without running any build step.

---

## 🎨 Design System & Tokens
- **Primary Color:** `#0F382A` (Himalayan Pine Deep Green)
- **Secondary / Accent:** `#D97706` / `#B45309` (Warm Amber)
- **Typography:** Plus Jakarta Sans
- **Icons:** Google Material Symbols Outlined
