# Precious Models E-commerce

A modern e-commerce platform built with Next.js 13+, featuring dynamic product catalog, search functionality, and Google authentication.

## Live Demo


## Features

✨ Dynamic product catalog with pagination
🔍 Real-time search functionality
🛒 Shopping cart with persistent storage
🔐 Google authentication
📱 Responsive design
⚡ Server-side rendering
🎨 Modern UI with DaisyUI and Tailwind CSS

## Tech Stack

- Next.js 13+
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- DaisyUI
- NextAuth.js

## Getting Started

1. Clone the repository:
git clone https://github.com/Rohit1419/Ecommerce-Website.git

2. Install dependencies:
npm install

Configure environment variables: Create a .env file with:
DATABASE_URL=your_postgresql_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

4. Start development server:
npm run dev

## Project Structure

Project Structure
src/
  ├── app/                 # Next.js 13+ app directory
  │   ├── api/            # API routes
  │   ├── cart/           # Shopping cart pages
  │   ├── products/       # Product pages
  │   ├── search/         # Search functionality
  │   └── lib/            # Utility functions
  ├── components/         # Reusable components
  └── types/              # TypeScript types

## Key Features

### Product Catalog
- Paginated product listing
- Detailed product views
- Search with instant results

### Shopping Cart
- Add/remove products
- Quantity management
- Cart persistence

### Authentication
- Google OAuth integration
- Protected routes
- User session management


## Connect With Me
https://www.linkedin.com/in/rohit-g-955391250/

## License
MIT License
