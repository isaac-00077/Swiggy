# Swiggy Clone

This is a Swiggy-inspired food ordering UI built with React and Vite. It recreates the homepage, restaurant listings, restaurant menu flow, search experience, cart, and supporting UI used across the app.

## Overview

- Home page with restaurant carousels, filters, and footer sections
- Restaurant menu page with offers, top picks, item cards, and restaurant details
- Search and discovery views for dishes and restaurants
- Cart and authentication flows powered by Redux and Firebase
- Responsive layout styled with Tailwind CSS

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Firebase Authentication

## Project Structure

- `src/components` contains the UI for pages, cards, menus, footer sections, and shared controls
- `src/hooks` hold shared data access logic
- `src/utils` contains Redux slices and store setup
- `src/api_data` contains the local restaurant and menu fixtures used by the app
- `public` contains static assets such as badges and logos

## Deployment

This project is set up to deploy on Vercel as a static Vite app.

- Build output: `vite build`
- Output directory: `dist`
- SPA routing should be handled by Vercel rewrites so React Router routes load correctly on refresh

## Notes

- The app uses locally stored JSON fixtures for restaurant and menu data in addition to UI-driven state
- Public assets for the Swiggy footer, app store badges, and branding are included in the `public` folder
- No installation or local setup instructions are included here, since this README is intended for the deployed project
