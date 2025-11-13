# COMAGEND NGO Website - Design Guidelines

## Design System Foundation

**Color Palette:**
- Earth Brown: #5A381F
- Sun Yellow: #F4B400  
- Leaf Green: #3A7A2A
- Sky Blue: #1D6BD8
- Warm Orange: #E66024
- Neutral Background: #F9F6F1

**Typography:**
- Headings: Poppins (bold, medium weights)
- Body: Lato or Open Sans
- Clear hierarchy with consistent sizing scale

**Spacing & Layout:**
- Spacing tokens: xs, sm, md, lg for consistent rhythm
- Border radius: 12-20px for cards and containers
- Consistent shadow system for depth
- Tailwind-based spacing primitives (use units of 2, 4, 8, 12, 16, 20, 24, 32)

## Visual Language

**African-Centered Aesthetic:**
- Warm, community-focused visual approach
- Custom African motif icons combined with Feather system icons
- Authentic imagery over generic stock photos
- Earth-tone based color treatments throughout

## Page-Specific Design Specifications

### Homepage

**Hero Section:**
- Full-bleed carousel (full viewport height)
- High-quality African community imagery with parallax foreground/background treatment
- Large, bold headline with Poppins typography
- Two CTAs: Primary "Donate Now" (prominent, contrasting) + Secondary "Get Involved"
- Manual swipe navigation with arrow controls
- Slide indicators clearly visible

**Impact Statistics Strip:**
- Horizontal layout with 4 key metrics
- Large numbers with animated counters (triggered on scroll)
- Icon accompaniment for each stat
- Clear labels beneath numbers
- Mobile: horizontal scroll or stacked vertical

**Programs Section:**
- Horizontal card slider (3 cards visible on desktop, 1 on mobile)
- Each card: featured image, title, short description, CTA button
- 3D tilt effect on hover (subtle perspective)
- Consistent card dimensions and spacing
- Clear visual hierarchy within cards

**Stories/Testimonials:**
- Full-width slider with large quote cards
- Portrait images with overlay quotes
- Navigation controls and indicators
- Pause autoplay on hover/focus
- Mobile-optimized single card view

**Call-to-Action Cards:**
- 3-column grid (desktop) / stacked (mobile)
- "Donate", "Volunteer", "Partner" options
- Icon + heading + brief description + CTA per card
- Hover state with subtle animation

### About Page

**Mission/Vision Section:**
- Clear subheadings separating Mission, Vision, Values
- Scannable text blocks with adequate whitespace
- Supporting imagery interspersed with content
- Icon-enhanced value cards in grid layout

**Team Grid:**
- Consistent card sizing with square/circle headshots
- Name, role, brief bio visible
- Hover overlay: social media icons slide up (desktop)
- Tap toggle for overlay (mobile)
- Filterable by role/region if applicable

### Projects Page

**Project Showcase:**
- Alternating image-text layout (left/right pattern)
- Each project block includes:
  - Hero image (consistent size ratio)
  - Project title and category
  - Quick summary box: duration, beneficiaries, partners, key outcomes
  - Longer description text
  - "Read Full Report" CTA
- Clear visual separation between projects
- Consistent spacing and alignment

**Project Gallery:**
- Heading: "Project Highlights" or "Impact in Action"
- Masonry or even grid of project images
- Hover state reveals caption/context
- Click to view full-size modal

### Blog Page

**Blog Listing:**
- Masonry/grid layout with feature differentiation (first post larger/featured)
- Each card: thumbnail image, category tag, title, excerpt, read time badge
- Hover: subtle tilt and shadow enhancement
- "Load More" button prominently styled
- Category filter tags at top

**Blog Article:**
- Hero image at top
- Reading progress bar (thin, fixed top)
- Clear typography hierarchy for headings
- Share toolbar (WhatsApp, Facebook, Twitter) - sticky on scroll
- Related posts at bottom

### Partners/Supporters Page

**Partner Grid:**
- Organized by category (Funding, Implementation, Community)
- Section headings for visual grouping
- Consistent logo sizing with adequate spacing
- Border/background cards for logo containment
- Brief description text for each partner category
- No repetitive mission statements

### Contact Page

**Contact Section Layout:**
- Two-column split (desktop): Form left, Info right
- Single column stacked (mobile)

**Information Panel:**
- Icon-enhanced contact methods:
  - Location icon + physical address
  - Email icon + email address
  - Phone icon + phone number
- Office hours with clock icon
- Map embed or stylized map graphic
- Social media links with icons

**Contact Form:**
- Clear field labels above inputs
- Friendly microcopy ("We'll respond within 24 hours")
- Input fields: Name, Email, Subject, Message
- Inline validation with animated success checkmarks
- Prominent "Send Message" button with emphasis
- Visual feedback on form submission

### Donation Flow

**Donation Modal:**
- Slide-up modal animation
- Focus trap for accessibility
- Multi-step progression:
  1. Amount selection (preset options + custom)
  2. Donor details (name, email, optional tax receipt info)
  3. Payment (Stripe Elements integration)
  4. Confirmation with receipt download
- Progress indicator showing current step
- Campaign goal progress bar with animation
- Security badges and trust indicators
- Clear "Recurring" vs "One-time" toggle

## Navigation & Global Elements

**Header:**
- Sticky positioning
- Compresses on scroll down (reduced height)
- Logo left, navigation center/right, Donate CTA right
- Mobile: hamburger menu with slide-in drawer
- Keyboard accessible with focus indicators

**Footer:**
- Animated wave or pattern background (subtle)
- Four-column layout (desktop): About, Quick Links, Programs, Contact
- Newsletter signup form with inline submit
- Social media icon links
- Copyright and legal links
- Consistent with header color treatment

**Floating Donate Button (Mobile):**
- Bottom-right fixed position
- Circular or rounded-rectangle
- Contrasting color (Sun Yellow or Warm Orange)
- Subtle bounce on page load
- Micro bounce on hover/tap
- Opens donation modal on click

## Animation & Interaction Principles

**Page Transitions:**
- Left/right sliding for main navigation
- Duration: 360-450ms
- Easing: cubic-bezier(0.22, 1, 0.36, 1)
- Respect prefers-reduced-motion

**Micro-interactions:**
- Buttons: 2px press offset + subtle scale on hover
- Form success: animated checkmark appearance
- Image cards: progressive reveal on scroll (mask slide + fade)
- Counters: number easing with thousand separators
- CTA buttons: gradient sweep or micro Lottie animation

**Hover States:**
- Cards: subtle tilt (3D perspective)
- Images: slight zoom or parallax shift
- Buttons: scale 1.05 + shadow enhancement
- Links: underline slide-in animation

## Accessibility Requirements

- WCAG AA color contrast throughout
- Focus-visible outlines for keyboard navigation
- Aria labels on all interactive elements
- All animations honor prefers-reduced-motion
- Keyboard accessible sliders and modals
- Descriptive alt text for all images
- Adequate touch target sizes (min 44x44px)

## Images

**Required Images:**
1. **Hero Carousel** (3-5 slides): High-quality photos of African communities, COMAGEND programs in action, empowerment moments - authentic, warm, people-focused
2. **Program Cards**: Specific imagery for each program showing beneficiaries and activities
3. **Team Headshots**: Professional portraits with consistent styling
4. **Project Showcase**: Before/after or impact documentation photos
5. **Blog Thumbnails**: Feature images for each article
6. **Testimonial Portraits**: Beneficiary or supporter photos
7. **Partner Logos**: High-resolution, transparent background versions

All images should use WebP/AVIF formats with responsive srcset, lazy loading below fold, and descriptive alt text.