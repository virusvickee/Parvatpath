# 📋 PRD — Parvatpath.com
**Product:** Himalayan Trekking & Adventure Tourism Platform  
**Domain:** parvatpath.com  
**Stack:** Next.js 14 (App Router) + MongoDB Atlas + Razorpay + Cloudinary + Vercel  
**Version:** V1.0  
**Date:** June 2026  
**Author:** Vikas Uniyal

---

## 1. Product Summary

### 1.1 What Is This?
Parvatpath is a premium Himalayan trekking platform that allows users to discover, explore, and book treks, tours, and Char Dham packages in Uttarakhand and across India. It combines a content-rich discovery experience with a seamless mobile-first booking engine and Razorpay-powered partial payments.

### 1.2 Target Users
| User Type | Age | Profile |
|-----------|-----|---------|
| Weekend Warriors | 22–35 | Urban professionals, 2–3 day treks |
| Himalayan Enthusiasts | 25–40 | Experienced trekkers, want detail |
| College Groups | 18–24 | Budget-conscious, social media driven |
| Solo Female Trekkers | 20–35 | Safety-first, community-oriented |
| Char Dham Pilgrims | 45–65 | Families, comfort + spiritual |
| International Trekkers | 25–45 | EBC/Nepal alumni, credibility seekers |

### 1.3 Core Problem It Solves
Most Himalayan trekking companies (including TSS currently) rely on WhatsApp/phone for bookings. This creates:
- Drop-offs when users can't reach someone immediately
- No 24/7 availability
- Manual batch management prone to overbooking
- 10–15% OTA commission loss when booking via Thrillophilia etc.

Parvatpath solves this with a direct, mobile-first booking platform.

### 1.4 Business Goals
- Drive 100% direct bookings (zero OTA dependency)
- Convert trek discovery → payment in under 4 taps on mobile
- Rank organically for "treks in Uttarakhand", "Valley of Flowers trek", "Char Dham 2026" etc.
- Scale to 500+ bookings/month within 6 months of launch

---

## 2. Pages & Routes

### 2.1 Public Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Hero, featured treks, stats, testimonials, CTA |
| `/treks` | Trek Listing | All treks with filters |
| `/treks/[slug]` | Trek Detail | Full trek info + booking CTA |
| `/tours` | Tour Packages | Leisure & group tours |
| `/tours/[slug]` | Tour Detail | Full tour info + booking |
| `/char-dham` | Char Dham | Dedicated yatra page |
| `/char-dham/[slug]` | Char Dham Detail | Package detail + booking |
| `/blogs` | Blog Listing | SEO content hub |
| `/blogs/[slug]` | Blog Detail | Individual blog post |
| `/about` | About Us | Story, team, certifications |
| `/contact` | Contact | Form + WhatsApp + phone |
| `/gallery` | Gallery | Trek photo gallery |
| `/faq` | FAQ | Common questions |
| `/cancellation-policy` | Policy | Cancellation terms |
| `/terms` | Terms | T&C |
| `/privacy` | Privacy Policy | Privacy terms |

### 2.2 Booking Flow Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/booking/[slug]` | Booking Page | Select batch, participants, pay |
| `/booking/confirm` | Confirmation | Success page + booking ID |
| `/booking/failed` | Failed | Payment failed + retry |

### 2.3 User Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/login` | Login | OTP-based login |
| `/register` | Register | New user signup |
| `/dashboard` | User Dashboard | My bookings, profile |
| `/dashboard/bookings` | My Bookings | All booking history |
| `/dashboard/profile` | Profile | Edit name, phone, email |

### 2.4 Admin Pages (Protected)

| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | Dashboard | Stats overview |
| `/admin/treks` | Trek Management | CRUD treks |
| `/admin/treks/new` | Add Trek | New trek form |
| `/admin/treks/[id]` | Edit Trek | Edit existing trek |
| `/admin/batches` | Batch Management | Manage dates + seats |
| `/admin/bookings` | All Bookings | View, filter, update status |
| `/admin/tours` | Tour Management | CRUD tours |
| `/admin/blogs` | Blog Management | CRUD blogs |
| `/admin/coupons` | Coupon Management | Create/disable coupons |
| `/admin/enquiries` | Enquiries | View contact form submissions |
| `/admin/users` | Users | View registered users |

---

## 3. Features & Functional Requirements

### 3.1 Homepage

**Components:**
- Full-width hero with video/parallax background + headline + CTA ("Explore Treks")
- Search bar — search by trek name or destination
- Featured Treks section — 6 cards, filterable by Season
- Stats bar — "15,000+ Trekkers", "50+ Treks", "5★ Rating", "10+ Years"
- Trek Categories — By Month, By Region, By Difficulty (visual grid)
- Why Choose Us — 4 USP cards (Safety, Local Expertise, Certified, Experience)
- Testimonials — Rotating review cards with name, trek name, rating
- In the Media — Logo strip (news mentions)
- Certifications — StartupIndia, MSME, Uttarakhand Tourism, IMF logos
- WhatsApp floating CTA button (bottom right, always visible)
- Newsletter signup

**User Stories:**
- As a visitor, I want to see featured treks immediately so I can start exploring
- As a visitor, I want to see trust signals (ratings, certifications) so I feel confident booking
- As a visitor, I want a WhatsApp button so I can ask questions instantly

**Acceptance Criteria:**
- Hero loads in < 2s (LCP)
- WhatsApp button visible on all pages
- Stats counter animates on scroll
- Mobile layout stacks sections vertically

---

### 3.2 Trek Listing Page (`/treks`)

**Components:**
- Filter sidebar / top filter bar:
  - Region (Uttarakhand, Himachal, Kashmir, Nepal, West Bengal)
  - Difficulty (Easy, Easy-Moderate, Moderate, Moderate-Difficult, Difficult)
  - Duration (2D/1N, 3D/2N, 4D/3N, 5D/4N, 6D/5N, 7D+)
  - Month (Jan–Dec)
  - Price Range (slider: ₹0 – ₹30,000)
- Sort by: Price (Low–High), Duration, Popularity
- Trek Cards (grid, 3 col desktop / 1 col mobile):
  - Cover image
  - Trek name
  - Region badge
  - Difficulty badge (color-coded)
  - Duration
  - Starting price ("From ₹X,XXX")
  - Rating + review count
  - "View Trek" CTA
- Total count ("Showing 24 of 52 treks")
- Pagination or infinite scroll

**User Stories:**
- As a user, I want to filter treks by month so I can find what's available when I plan to go
- As a user, I want to see difficulty clearly so I pick appropriate treks
- As a user, I want to sort by price so I find budget options

**Acceptance Criteria:**
- Filters update results without page reload (client-side filtering)
- URL params update on filter change (shareable filtered URLs)
- Mobile filter opens as bottom sheet
- Empty state shown when no results match filters

---

### 3.3 Trek Detail Page (`/treks/[slug]`)

**Components:**
- Hero banner — full width image + trek name overlay
- Breadcrumb — Home > Treks > Trek Name
- Quick Info Bar — Duration | Difficulty | Max Altitude | Best Season | Group Size
- Tab Navigation — Overview | Itinerary | Inclusions | Gallery | Reviews
- **Overview Tab:**
  - Trek description (rich text)
  - Highlights (bullet list)
  - Map embed (Google Maps or static image)
  - Difficulty visual meter
- **Itinerary Tab:**
  - Day-wise accordion (Day 1: Title, description, distance, altitude)
- **Inclusions/Exclusions Tab:**
  - Two-column: ✅ Included | ❌ Excluded
  - What to carry list
- **Gallery Tab:**
  - Masonry photo grid, lightbox on click
- **Reviews Tab:**
  - Star rating aggregate
  - Individual review cards (name, rating, date, comment)
- **Sticky Sidebar (desktop) / Bottom Bar (mobile):**
  - "Book Now" CTA
  - Next available batch date
  - Starting price
  - Seats left indicator ("3 seats left!" in red when < 5)
- **Batch Dates Section:**
  - Table/cards: Start Date | End Date | Price | Seats Left | Book Button
  - Sold out batches shown as greyed out
- **Related Treks** — 3 cards at bottom

**User Stories:**
- As a user, I want to see day-wise itinerary so I know exactly what to expect
- As a user, I want to see real-time seat availability so I book before it's full
- As a user, I want to read reviews so I trust the operator

**Acceptance Criteria:**
- Page generated via ISR (revalidate every 1 hour)
- Sticky sidebar follows scroll on desktop
- Seats left < 5 shows urgency indicator
- Gallery opens in lightbox with swipe on mobile

---

### 3.4 Booking Flow (`/booking/[slug]`)

**Step 1 — Select Batch & People**
- Dropdown: Select batch date (from available batches)
- Number of participants (adults)
- Price summary updates live

**Step 2 — Participant Details**
- For each participant: Full Name, Age, Gender, Emergency Contact
- Primary booker: Phone, Email

**Step 3 — Apply Coupon**
- Coupon code input
- Show discount applied or error

**Step 4 — Payment Summary**
- Trek name, batch date, participants
- Base amount
- Discount (if coupon)
- GST (5%)
- Total amount
- Payment Option:
  - **Pay 30% Now** (advance to confirm booking)
  - **Pay Full Amount**
- Razorpay checkout opens on CTA click

**Step 5 — Confirmation (`/booking/confirm`)**
- Booking ID
- Trek name, batch date
- Amount paid
- What's next (packing list, pickup point)
- Download PDF button
- Share on WhatsApp button

**User Stories:**
- As a user, I want to pay 30% advance so I can confirm my slot without paying full amount immediately
- As a user, I want booking confirmation on screen and email so I have proof
- As a user, I want to add multiple participants in one booking

**Acceptance Criteria:**
- Razorpay payment verified server-side via webhook (not client-side)
- On successful payment: booking status = "confirmed", seats decremented
- On failed payment: booking status = "pending", user redirected to /booking/failed
- Confirmation email sent via Nodemailer/Resend within 60 seconds
- Booking ID generated as human-readable code (e.g. PVP-2026-00123)

---

### 3.5 User Authentication

**Method:** OTP-based (Phone or Email)

**Flow:**
1. User enters phone/email → OTP sent (via Twilio SMS or Resend email)
2. User enters OTP → JWT token issued (7 day expiry)
3. JWT stored in httpOnly cookie

**Roles:**
- `user` — can book, view own bookings, edit profile
- `admin` — full access to admin panel

**User Stories:**
- As a user, I want to login without password so I don't have to remember anything
- As an admin, I want protected routes so regular users can't access admin panel

**Acceptance Criteria:**
- OTP expires in 10 minutes
- Max 3 OTP attempts before lockout (15 min)
- JWT refresh handled automatically
- Admin routes return 403 for non-admin users

---

### 3.6 Razorpay Payment Integration

**Flow:**
1. User clicks "Pay Now" on booking page
2. Frontend calls `/api/payment/create-order` with amount
3. Next.js API Route creates Razorpay order, returns `order_id`
4. Razorpay checkout modal opens on frontend
5. User completes payment
6. Razorpay sends webhook to `/api/payment/webhook`
7. Server verifies signature, updates booking status
8. Confirmation page shown

**Partial Payment:**
- 30% advance = `totalAmount * 0.30` (rounded to nearest rupee)
- Remaining 70% collected 7 days before trek via payment link (sent via email/WhatsApp)

**Refund:**
- Admin can initiate refund from `/admin/bookings/[id]`
- Calls Razorpay Refund API
- Refund status tracked in booking record

**User Stories:**
- As a user, I want to pay via UPI/Card/NetBanking so I have flexibility
- As a user, I want instant confirmation after payment so I feel secure
- As an admin, I want to process refunds from dashboard so I don't need Razorpay portal access

**Acceptance Criteria:**
- Payment verification ONLY server-side (never trust client)
- Webhook signature verified with `razorpay_secret`
- Failed payments logged with error reason
- Refunds reflect in booking status within 5 minutes

---

### 3.7 Admin Panel

**Dashboard (`/admin`):**
- Total bookings (today / this month / all time)
- Revenue (today / this month)
- Upcoming batches with seat fill %
- Recent bookings table
- Popular treks chart

**Trek Management:**
- List all treks (name, slug, status, price)
- Create new trek — full form (name, slug, description, region, difficulty, duration, altitude, inclusions, exclusions, itinerary builder, gallery upload via Cloudinary, SEO meta)
- Edit existing trek
- Toggle trek active/inactive (soft delete)

**Batch Management:**
- Per trek: Add/edit batch dates
- Fields: Start date, End date, Price, Total seats
- Auto-calculated: Booked seats, Available seats

**Booking Management:**
- Table: Booking ID, User, Trek, Batch, Amount, Status, Payment
- Filter by: Status, Date range, Trek
- View booking detail
- Update status: pending → confirmed → completed / cancelled
- Initiate refund button

**Blog Management:**
- Rich text editor (Quill or TipTap)
- Title, slug, cover image, content, SEO meta, publish/draft toggle

**Coupon Management:**
- Create coupon: Code, Type (flat/percent), Value, Max uses, Expiry date
- View usage count
- Disable/enable coupon

**User Stories:**
- As an admin, I want to add new batches for a trek so users can book upcoming dates
- As an admin, I want to see revenue summary so I track business performance
- As an admin, I want to update booking status so customers get accurate information

**Acceptance Criteria:**
- Admin panel accessible only with role = "admin"
- All CRUD operations reflect instantly in UI
- Cloudinary image upload with progress indicator
- Batch seat count auto-updates on new booking

---

### 3.8 Blog / Content Section

**Listing Page (`/blogs`):**
- Grid of blog cards (cover, title, excerpt, date, read time)
- Category filter (Trek Tips, Gear, Destinations, Safety)
- Search by title

**Detail Page (`/blogs/[slug]`):**
- Full article with rich text
- Table of contents (auto-generated from headings)
- Related blogs at bottom
- Share buttons (WhatsApp, Twitter, copy link)
- SEO meta: title, description, OG image

**Purpose:** Long-term organic SEO. Target keywords:
- "Best treks in June Uttarakhand"
- "Valley of Flowers trek itinerary"
- "Kedarkantha trek difficulty"
- "Char Dham package from Dehradun"

---

### 3.9 Contact & Enquiry

**Contact Page:**
- Form: Name, Email, Phone, Interested In (Trek/Tour/Char Dham/Other), Message
- On submit: stored in DB + email notification to admin
- WhatsApp button (opens wa.me link)
- Phone numbers listed
- Google Maps embed (Dehradun office)

**Floating WhatsApp CTA:**
- Fixed bottom-right on all pages
- Pre-filled message: "Hi Parvatpath! I want to know more about [current page trek name if on trek page, else general]"

---

## 4. Data Models (MongoDB Collections)

### 4.1 `users`
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "phone": "string",
  "role": "user | admin",
  "otp": "string",
  "otpExpiry": "Date",
  "isVerified": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 4.2 `treks`
```json
{
  "_id": "ObjectId",
  "slug": "string (unique)",
  "name": "string",
  "region": "Uttarakhand | Himachal | Kashmir | Nepal | West Bengal",
  "difficulty": "Easy | Easy-Moderate | Moderate | Moderate-Difficult | Difficult",
  "duration": { "days": "number", "nights": "number" },
  "maxAltitude": "string",
  "bestSeason": ["string"],
  "groupSize": { "min": "number", "max": "number" },
  "startingPrice": "number",
  "coverImage": "string (Cloudinary URL)",
  "gallery": ["string"],
  "description": "string (rich text HTML)",
  "highlights": ["string"],
  "itinerary": [
    {
      "day": "number",
      "title": "string",
      "description": "string",
      "distance": "string",
      "altitude": "string"
    }
  ],
  "inclusions": ["string"],
  "exclusions": ["string"],
  "thingsToBring": ["string"],
  "seoMeta": {
    "title": "string",
    "description": "string",
    "ogImage": "string"
  },
  "isActive": "boolean",
  "isFeatured": "boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 4.3 `batches`
```json
{
  "_id": "ObjectId",
  "trekId": "ObjectId (ref: treks)",
  "startDate": "Date",
  "endDate": "Date",
  "price": "number",
  "totalSeats": "number",
  "bookedSeats": "number",
  "isActive": "boolean",
  "createdAt": "Date"
}
```

### 4.4 `bookings`
```json
{
  "_id": "ObjectId",
  "bookingId": "string (PVP-2026-XXXXX)",
  "userId": "ObjectId (ref: users)",
  "trekId": "ObjectId (ref: treks)",
  "batchId": "ObjectId (ref: batches)",
  "participants": [
    {
      "name": "string",
      "age": "number",
      "gender": "Male | Female | Other",
      "emergencyContact": "string"
    }
  ],
  "contactEmail": "string",
  "contactPhone": "string",
  "totalAmount": "number",
  "discountAmount": "number",
  "gstAmount": "number",
  "finalAmount": "number",
  "advancePaid": "number",
  "balanceDue": "number",
  "paymentType": "advance | full",
  "paymentStatus": "pending | paid | partially_paid | refunded",
  "bookingStatus": "pending | confirmed | completed | cancelled",
  "couponCode": "string",
  "razorpayOrderId": "string",
  "razorpayPaymentId": "string",
  "razorpaySignature": "string",
  "refundId": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 4.5 `blogs`
```json
{
  "_id": "ObjectId",
  "slug": "string (unique)",
  "title": "string",
  "excerpt": "string",
  "content": "string (rich text HTML)",
  "coverImage": "string (Cloudinary URL)",
  "category": "Trek Tips | Gear | Destinations | Safety",
  "author": "string",
  "readTime": "number (minutes)",
  "isPublished": "boolean",
  "publishedAt": "Date",
  "seoMeta": {
    "title": "string",
    "description": "string",
    "ogImage": "string"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 4.6 `coupons`
```json
{
  "_id": "ObjectId",
  "code": "string (unique, uppercase)",
  "discountType": "flat | percent",
  "value": "number",
  "minOrderAmount": "number",
  "maxUses": "number",
  "usedCount": "number",
  "expiry": "Date",
  "isActive": "boolean",
  "createdAt": "Date"
}
```

### 4.7 `enquiries`
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "phone": "string",
  "interestedIn": "Trek | Tour | Char Dham | Other",
  "message": "string",
  "isRead": "boolean",
  "createdAt": "Date"
}
```

### 4.8 `tours`
```json
{
  "_id": "ObjectId",
  "slug": "string",
  "name": "string",
  "type": "Leisure | Char Dham | Group | Corporate",
  "duration": { "days": "number", "nights": "number" },
  "startingPrice": "number",
  "coverImage": "string",
  "description": "string",
  "itinerary": ["object"],
  "inclusions": ["string"],
  "exclusions": ["string"],
  "seoMeta": "object",
  "isActive": "boolean",
  "createdAt": "Date"
}
```

---

## 5. API Routes (Next.js API Routes)

### Auth
```
POST   /api/auth/send-otp          → Send OTP to phone/email
POST   /api/auth/verify-otp        → Verify OTP, return JWT
GET    /api/auth/me                 → Get current user (from JWT cookie)
POST   /api/auth/logout             → Clear JWT cookie
```

### Treks
```
GET    /api/treks                   → List treks (with query filters)
GET    /api/treks/[slug]            → Get single trek by slug
POST   /api/treks                   → Create trek (admin)
PUT    /api/treks/[id]              → Update trek (admin)
DELETE /api/treks/[id]              → Soft delete trek (admin)
```

### Batches
```
GET    /api/batches?trekId=         → Get batches for a trek
POST   /api/batches                 → Create batch (admin)
PUT    /api/batches/[id]            → Update batch (admin)
DELETE /api/batches/[id]            → Delete batch (admin)
```

### Bookings
```
POST   /api/bookings/create         → Create booking record
GET    /api/bookings/my             → Get user's bookings (auth required)
GET    /api/bookings                → Get all bookings (admin)
GET    /api/bookings/[id]           → Get single booking (admin/owner)
PUT    /api/bookings/[id]/status    → Update booking status (admin)
```

### Payments
```
POST   /api/payment/create-order    → Create Razorpay order
POST   /api/payment/webhook         → Razorpay webhook (verify + update booking)
POST   /api/payment/refund          → Initiate refund (admin)
```

### Coupons
```
POST   /api/coupon/validate         → Validate coupon code + return discount
GET    /api/coupons                 → List coupons (admin)
POST   /api/coupons                 → Create coupon (admin)
PUT    /api/coupons/[id]            → Update coupon (admin)
```

### Blogs
```
GET    /api/blogs                   → List published blogs
GET    /api/blogs/[slug]            → Get blog by slug
POST   /api/blogs                   → Create blog (admin)
PUT    /api/blogs/[id]              → Update blog (admin)
DELETE /api/blogs/[id]              → Delete blog (admin)
```

### Misc
```
POST   /api/enquiry                 → Submit contact enquiry
GET    /api/enquiries               → Get all enquiries (admin)
PUT    /api/enquiries/[id]/read     → Mark enquiry as read (admin)
POST   /api/upload                  → Upload image to Cloudinary (admin)
```

---

## 6. UI / Design Direction

### 6.1 Theme
- **Style:** Dark earthy — deep forest, dramatic Himalayan feel
- **Background:** `#0D1117` (near black) primary, `#161B22` cards
- **Accent:** `#F97316` (orange — same as portfolio) for CTAs, badges, highlights
- **Text:** `#F0F6FC` primary, `#8B949E` secondary
- **Success:** `#22C55E` | **Danger:** `#EF4444`

### 6.2 Typography
- **Headings:** Space Grotesk (700/800 weight)
- **Body:** Inter (400/500)
- **Scale:** 12 / 14 / 16 / 20 / 24 / 32 / 48 / 64px

### 6.3 Key UI Patterns
- **Navbar:** Transparent on hero → solid dark on scroll, sticky
- **Trek Cards:** Image top, gradient overlay, info below, hover lift shadow
- **Difficulty Badges:** Color-coded (Green=Easy → Red=Difficult)
- **Seats Left:** Green when plenty → Orange < 10 → Red < 5 ("Only 3 seats!")
- **Booking Sidebar:** Sticky on desktop, fixed bottom bar on mobile
- **Itinerary:** Accordion, Day N: Title format
- **Gallery:** Masonry grid with lightbox
- **WhatsApp CTA:** Fixed bottom-right, green circle, pulse animation
- **Skeleton loaders** on trek listing while fetching

### 6.4 Mobile First Rules
- Minimum tap target: 44px
- Filter panel: Bottom sheet on mobile
- Booking sidebar → fixed bottom CTA bar on mobile
- No horizontal scroll anywhere

---

## 7. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| Trek/Blog pages | Next.js ISR, revalidate 1 hour |
| Trek listing | Server-side rendered with query params |
| Image optimization | next/image + Cloudinary CDN |
| SEO | Dynamic meta per page, sitemap.xml, robots.txt |
| Security | httpOnly JWT cookie, Razorpay webhook signature verify |
| OTP Rate limit | Max 3 attempts, 15 min lockout |
| Mobile | Fully responsive, 375px minimum |
| Accessibility | WCAG AA — keyboard nav, focus rings, aria labels |

---

## 8. Environment Variables

```env
# MongoDB
MONGODB_URI=

# Auth
JWT_SECRET=
JWT_EXPIRES_IN=7d

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# OTP (choose one)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE=

# Email
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://parvatpath.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

---

## 9. Phased Delivery Plan

### Phase 1 — Core UI + Discovery (Week 1–2)
- [ ] Project setup (Next.js 14, Tailwind, MongoDB connection)
- [ ] Homepage (hero, featured treks, stats, testimonials)
- [ ] Trek listing page with filters
- [ ] Trek detail page (all tabs, gallery, itinerary)
- [ ] Blog listing + detail pages
- [ ] About, Contact, FAQ pages
- [ ] Navbar + Footer
- [ ] WhatsApp floating button
- [ ] SEO meta, sitemap.xml

### Phase 2 — Booking + Payment (Week 3–4)
- [ ] OTP Auth (send/verify, JWT cookie)
- [ ] User dashboard (my bookings, profile)
- [ ] Booking flow (batch select → participants → coupon → payment summary)
- [ ] Razorpay integration (create order + webhook)
- [ ] Partial payment (30% advance) logic
- [ ] Booking confirmation page + email
- [ ] Coupon validation API

### Phase 3 — Admin Panel (Week 5–6)
- [ ] Admin layout + auth guard
- [ ] Admin dashboard (stats, recent bookings)
- [ ] Trek CRUD + Cloudinary image upload
- [ ] Batch management
- [ ] Booking management (view, status update, refund)
- [ ] Blog CRUD (rich text editor)
- [ ] Coupon management
- [ ] Enquiries management

### Phase 4 — Polish + Launch (Week 7)
- [ ] Mobile responsiveness audit
- [ ] Performance optimization (ISR, image lazy load)
- [ ] Error pages (404, 500)
- [ ] Skeleton loaders
- [ ] Final SEO audit
- [ ] Deploy to Vercel + connect parvatpath.com domain
- [ ] Smoke test all flows

---

## 10. Out of Scope (V1)

- Mobile app (iOS/Android)
- Multi-language support (Hindi)
- Live chat widget
- Review moderation / user-submitted reviews
- Trek comparison feature
- Affiliate / referral program
- Email marketing integration

---

## 11. Success Metrics (Post Launch)

| Metric | Target (3 months) |
|--------|-------------------|
| Direct bookings via site | 50+ / month |
| Mobile conversion rate | > 3% |
| Organic traffic | 1,000+ visits/month |
| Page load speed (mobile) | < 3s |
| Booking abandonment rate | < 60% |
| Admin panel usage | Daily by operator |
