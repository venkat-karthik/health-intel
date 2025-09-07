# Overview

This is a full-stack health intelligence platform designed as a proactive health surveillance system for India. The application features a secure dashboard for health officials and a public-facing portal with AI-powered predictive mapping capabilities. The platform allows users to visualize health data across different Indian states, view disease predictions, and report health issues through an interactive interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **3D Visualization**: React Three Fiber (@react-three/fiber) for 3D map rendering
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

The frontend follows a component-based architecture with reusable UI components organized in the `@/components/ui` directory. The application uses a modern design system with consistent spacing, colors, and typography defined through CSS custom properties.

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with JSON responses
- **Data Storage**: In-memory storage with CSV file reading for health data
- **Development Server**: Vite integration for hot module replacement in development
- **Error Handling**: Centralized error handling with proper HTTP status codes

The backend implements a simple but extensible architecture with route handlers separated from business logic. The storage layer abstracts data access patterns, making it easy to migrate to a database later.

## Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Definition**: Type-safe schema definitions in `shared/schema.ts`
- **Validation**: Zod schemas for runtime type checking and API validation
- **Migration Management**: Drizzle Kit for database migrations

The database schema includes tables for users and health predictions, with proper TypeScript types generated from the schema definitions.

## Data Flow and API Structure
- **Health Predictions**: POST `/api/predict` endpoint accepts region and month parameters
- **Region Data**: GET `/api/regions` endpoint returns available regions for mapping
- **Shared Types**: Common TypeScript interfaces and validation schemas shared between frontend and backend
- **Error Handling**: Consistent error responses with appropriate HTTP status codes

## Authentication and Session Management
- **Session Storage**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Management**: Basic user schema with username/password authentication
- **Security**: Password hashing and session-based authentication (implementation pending)

## Development and Build Configuration
- **Monorepo Structure**: Shared code between frontend and backend in `shared/` directory
- **Path Aliases**: TypeScript path mapping for clean imports (@/, @shared/)
- **Hot Reload**: Vite development server with backend integration
- **Build Process**: Separate build processes for frontend (Vite) and backend (esbuild)

# External Dependencies

## Core Runtime Dependencies
- **@neondatabase/serverless**: Neon database client for PostgreSQL connections
- **drizzle-orm**: Type-safe ORM for database operations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Frontend UI and Interaction
- **@radix-ui/**: Complete set of unstyled, accessible UI primitives (accordion, dialog, dropdown, form controls, etc.)
- **@tanstack/react-query**: Server state management and caching
- **@react-three/fiber** and **@react-three/drei**: 3D rendering and controls for interactive map visualization
- **react-hook-form** with **@hookform/resolvers**: Form state management and validation
- **wouter**: Lightweight client-side routing

## Styling and Design System
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant handling for component styling
- **clsx** and **tailwind-merge**: Conditional class name utilities

## Development and Build Tools
- **vite**: Frontend build tool and development server
- **drizzle-kit**: Database migration and introspection tool
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript/TypeScript bundler for production builds

## Validation and Type Safety
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle ORM and Zod for type-safe database schemas

## Additional Utilities
- **date-fns**: Date manipulation and formatting
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel/slider functionality
- **lucide-react**: Icon library
- **nanoid**: Unique ID generation