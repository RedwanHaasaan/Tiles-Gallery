<div align="center">
  <img src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png" alt="Tiles Gallery Logo" width="120" />
  
  # Tiles Gallery
  
  **A premium, immersive digital showroom for discovering and managing world-class tile collections.**

  [![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://tiles-gallery-jade.vercel.app/)

  <br />
  
  [🌍 View Live Demo](https://tiles-gallery-jade.vercel.app/) • [Report Bug](https://github.com/RedwanHaasaan/tiles-gallery/issues) • [Request Feature](https://github.com/RedwanHaasaan/tiles-gallery/issues)
</div>

<hr />

## 📖 Overview

**Tiles Gallery** is a beautifully crafted web platform designed to provide a highly interactive and visually stunning experience for customers looking to transform their spaces. With a curated collection of ceramic, marble, mosaic, and geometric tiles, the application seamlessly bridges the gap between premium interior design and modern web technology.

It features a custom semantic design system, smooth micro-interactions, robust authentication, and high-performance server-side rendering, ensuring users enjoy an unparalleled, luxurious browsing experience.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **Premium Aesthetic** | A meticulously designed bespoke *espresso and gold* semantic color system that exudes professionalism and luxury. |
| ⚡ **Fluid Animations** | Employs `animate.css` and custom keyframes for staggered scroll-reveals, hover-shimmer gloss effects, and floating UI elements. |
| 🖼️ **Immersive Carousels** | Integrates SwiperJS for cinematic "Creative" slide transitions with perfectly synchronized thumbnail navigation. |
| 🔍 **Dynamic Browsing** | Effortlessly filter and explore comprehensive collections categorized by material, finish, and style. |
| 🔒 **Robust Authentication** | Secure email/password and Google OAuth login powered by Better Auth, featuring smooth error handling and form validation. |
| 👤 **User Dashboards** | Dedicated profile management portals for authenticated users to view and update their personal information seamlessly. |

---

## 📦 Technology Stack

Built with modern, scalable, and performance-driven tools:

### Core Architecture
- **[Next.js (v16+)](https://nextjs.org/)** - React framework for production (App Router)
- **[React (v19)](https://react.dev/)** - Frontend UI library

### UI & Styling
- **[Tailwind CSS (v4)](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI (v5)](https://daisyui.com/)** - Elegant, semantic component library
- **[Animate.css](https://animate.style/)** - Plug-and-play CSS animations
- **[SwiperJS](https://swiperjs.com/)** - Hardware-accelerated mobile touch sliders
- **[Lucide React](https://lucide.dev/)** - Clean, modern iconography

### Forms & Notifications
- **[React Hook Form](https://react-hook-form.com/)** - High-performance form validation
- **[React Toastify](https://fkhadra.github.io/react-toastify/)** - Customizable push notifications

### Backend & Authentication
- **[Better Auth](https://better-auth.com/)** - Comprehensive, secure authentication framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for flexible data storage
- **`@better-auth/mongo-adapter`** - Official synchronization adapter for MongoDB

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RedwanHaasaan/tiles-gallery.git
   cd tiles-gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the necessary environment variables for MongoDB and Better Auth:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (Better Auth)
   BETTER_AUTH_SECRET=your_generated_secret
   BETTER_AUTH_URL=http://localhost:3000

   # OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

<div align="center">
  <p>Built by the Redwan Hasan</p>
</div>
