# Tiles Gallery

Tiles Gallery is a premium web application designed to showcase a curated collection of professional tiles for architects, designers, and homeowners. The platform offers a seamless experience for browsing, filtering, and managing tile collections with a focus on high-quality visuals and responsive performance.

## 🚀 Live Demo
[View Live Site](https://tiles-gallery-self.vercel.app)

## 🎯 Purpose
The purpose of this project is to provide a sophisticated, user-friendly interface for exploring high-end tile products. It serves as a digital showroom where users can discover materials, view detailed specifications, and manage their personal profiles.

## ✨ Key Features
- **Dynamic Search & Filtering**: Efficiently find tiles using real-time search and category-based filtering (e.g., Ceramic, Porcelain, Marble).
- **Secure Authentication**: Complete auth system powered by `better-auth`, featuring email/password sign-in, account registration, and secure session management.
- **Personalized Profiles**: Dedicated user profile section to manage account details and preferences.
- **Premium Design & Typography**: A stunning UI using `Playfair Display` for elegant titles and `DM Sans` for readable body text.
- **Optimized Performance**: 
  - **Data Fetching**: Utilizes Next.js ISR (Incremental Static Regeneration) with smart revalidation.
  - **Image Optimization**: High-resolution images are dynamically resized via a proxy server to ensure fast load times without quality loss.
- **Fully Responsive**: Optimized for all devices, from mobile phones to high-resolution desktop monitors.

## 🛠️ Tech Stack & NPM Packages
### Core Framework
- **Next.js 16.2.4**: React framework for production.
- **React 19.2.4**: Core UI library.

### Authentication & Database
- **Better Auth 1.6.9**: Comprehensive authentication solution.
- **MongoDB 7.2.0**: NoSQL database for session and user data.
- **@better-auth/mongo-adapter**: Official MongoDB adapter for Better Auth.

### Styling & UI Components
- **Tailwind CSS 4.0**: Utility-first CSS framework.
- **HeroUI (@heroui/react)**: Premium React UI component library.
- **DaisyUI 5.5.19**: Tailwind CSS component plugin.
- **Clsx & Tailwind-merge**: Utilities for managing conditional CSS classes.

### Icons & Misc
- **Lucide & Gravity UI Icons**: High-quality vector icons.
- **React Fast Marquee**: Smooth scrolling animations.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bashar35790/Tiles-Gallery.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   BETTER_AUTH_SECRET=your_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   BETTER_AUTH_URL=http://localhost:3000
   DATABASE_URI=your_mongodb_uri
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open the app**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 License
This project is for demonstration purposes.
