# Art Café Website

## Overview

This is a modern, responsive website for an Arabic Art Café that combines cultural events, art exhibitions, and a café experience. The website is built with Next.js, React, TypeScript, and Tailwind CSS, featuring right-to-left (RTL) support for Arabic language content.

## Features

- **Modern Design**: Clean and responsive layout that adapts to all screen sizes
- **RTL Support**: Full right-to-left text direction for Arabic language
- **Admin Dashboard**: Complete content management system accessible at `/admin`
- **Supabase Integration**: Data persistence using Supabase as a backend
- **Dynamic Content**: All content is editable through the admin interface
- **Image Management**: Upload and manage images for events, artworks, and café items

## Website Sections

1. **Home Page**: Showcases featured events, artworks, and café highlights
2. **Gallery**: Displays the art collection with filterable categories
3. **Events**: Lists upcoming cultural and artistic events
4. **Café**: Presents the menu with food and beverage offerings
5. **Admin Dashboard**: Content management interface

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Access the website at `http://localhost:3000`

## Supabase Integration

This project uses Supabase as a backend for data persistence. For detailed setup instructions, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

Benefits of the Supabase integration:
- Data persistence across sessions and devices
- Admin dashboard for content management
- Easy migration from localStorage to Supabase
- Fallback to localStorage if Supabase is unavailable

## Admin Dashboard

The admin dashboard can be accessed at `/admin` and allows you to:

1. Manage events (add, delete, view)
2. Manage artworks (add, delete, toggle featured status)
3. Manage café items (add, delete)
4. Update opening hours
5. Configure and manage the Supabase database

## Technology Stack

- **Framework**: Next.js 14+
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Backend**: Supabase (with localStorage fallback)
- **UI Components**: Shadcn UI
- **Icons**: Lucide Icons

## Development Notes

- The application supports both Arabic (RTL) and English (LTR) content
- All data is managed through the admin dashboard at `/admin`
- The website follows modern design principles with a focus on user experience
- The site is fully responsive, adapting to mobile, tablet, and desktop viewports

## License

This project is licensed under the MIT License. 