# HHTrails (Himalayan Heritage Trails)

![HHTrails](public/favicon/favicon.ico) <!-- You can replace with an actual banner image -->

A modern, interactive travel platform designed to showcase curated tours and expeditions across the Himalayas. It provides users with a comprehensive portal to explore tour packages, view detailed daily itineraries with interactive maps, read travel blogs, and safely authenticate to save and manage their favorite experiences.

## ✨ Key Features
- **Tour Discovery & Booking:** Browse an extensive catalogue of heritage tours. Includes detailed layouts with itineraries, photo galleries, and integrated Google Maps for routes.
- **User Authentication:** Robust authentication system with standard email/password and Google OAuth integrations using Supabase.
- **Personalized "Saved Tours":** Authenticated users can bookmark and save tours they are interested in, managed via a dedicated dashboard.
- **Travel Blog & Library:** A dedicated blog section featuring rich-text articles, category filtering, a newsletter subscription layout, and a traveler's library.
- **Interactive UI Components:** Smooth carousel sliders for heritage panoramas (powered by Swiper) and animated interface transitions.
- **Admin & Developer Tools:** Built-in hidden modules and pages for platform management.
- **Document Generation:** Includes capabilities to generate and export content to PDF, likely for tour brochures or itineraries.

## 🛠 Technology Stack

**Core & Build Pipeline:**
- **Framework:** [React 18](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) for static typing and domain safety.
- **Build Tool:** [Vite](https://vitejs.dev/) for lightning-fast HMR and building.
- **Routing:** [React Router v7](https://reactrouter.com/) for application routing.

**Styling & UI:**
- **CSS Framework:** [Tailwind CSS v3](https://tailwindcss.com/) (with `@tailwindcss/typography` for blog/rich-text styling).
- **Icons:** `lucide-react` & `react-icons`.
- **Carousels/Sliders:** `swiper`.

**Backend & Integrations:**
- **Database/Auth (BaaS):** [Supabase](https://supabase.com/) (`@supabase/supabase-js`).
- **Maps Integration:** `@react-google-maps/api`.
- **Formatting/Generation:** `marked` for Markdown parsing, `jspdf` for PDF generation.

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd HHT
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and configure the minimum required variables for external services:
   ```env
   # For local development, point this at your local API server.
   # For production builds and Cloudflare Pages, this must point to the
   # public API host that is reachable from the build environment.
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ENABLE_DEVELOPERS_PAGE=true
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:5173`.*

### Available Scripts
- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Compiles the TypeScript code and pushes a production-ready build to the `dist` folder.
- `npm run typecheck`: Runs the TypeScript compiler to catch type errors without emitting compiled files.
- `npm run preview`: Bootstraps a local server to preview your compiled production build.

## 🏗 Architecture
The application is structured using a feature-based, modular architecture designed for scalability:

* `src/components/`: Reusable UI components grouped by feature domains (e.g., `/tours`, `/blog`, `/home`).
* `src/pages/`: Route-level entry files representing the different pages.
* `src/services/` & `src/config/`: Contains API wrappers and specific domain logic to keep components clean.
* `src/contexts/`: Centralized React Context providers for global state management (Auth, Saved Tours).
* `src/hooks/`: Custom React hooks abstracting complex logic.
* `src/types/`: Global TypeScript interfaces mapping to API schemas.
* `src/utils/`: Generic utility processors for storage and validation.

---

## 📝 TO-DO / Backlog

- [ ] Saved tour button in Nav Bar MobView

### Tour Detail Page
- [ ] CUSTOMIZE TOUR P

### Blog Page
- [ ] Travellers Library Integration P
- [ ] Email Integration A

### Add Ons
- [ ] Id to name on tour url
- [ ] Caches
- [ ] Image Clarity
- [ ] Database image deletion
