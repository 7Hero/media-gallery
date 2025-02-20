# Media Gallery

A React application for managing and organizing media files.

## Prerequisites

- Node.js >= 18
- Bun >= 1.0.0 (recommended), or any other package manager (e.g. npm)
- Git

## Setup

1. Clone the repository:

```bash
git clone https://github.com/7Hero/media-gallery
cd media-gallery
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npm run dev
```

You can use `bun` if you have it installed, just replace `npm` with `bun` in the above commands.

This will start the app at http://localhost:5173

## Architecture

### Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server
- **Zustand** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React DnD** - Drag and drop functionality

### Project Structure

```
src/
  ├── components/ # React components
  │ ├── ui/ # Reusable UI components
  │ ├── icons/ # SVG icons as React components
  │ └── filters/ # Filter-related components
  ├── hooks/ # Custom React hooks
  ├── lib/ # Utility functions and helpers
  ├── stores/ # Zustand stores
  └── types/ # TypeScript type definitions
```

### State Management

The application uses Zustand for state management with two main stores:

1. **MediaStore** (`stores/media.ts`)

   - Manages media files and folders
   - Handles file operations (add, remove, move)
   - Persists data to localStorage

2. **SelectionStore** (`stores/selection.ts`)

   - Manages selected files
   - Handles multi-select functionality

3. **useFiltersStore** (`stores/filters.ts`)
   - Manages filters
   - Handles filters changes

### Component Architecture

- **App.tsx** - Root component, provides routing and layout
- **sidebar.tsx** - Navigation, folder management and filters
- **media-grid.tsx** - Displays media files in a grid layout

## Known Limitations

1. **File Storage**

   - Currently uses localStorage for persistence
   - No real file uploads implemented

2. **Performance**

   - Large collections may cause performance issues
   - No virtualization for media grid
   - No image optimization or lazy loading

3. **Devices**
   - Not responsive, desktop-only application
   - Cannot be used effectively on mobile devices or tablets

### Next Steps

1. **Backend Integration**

   - Implement a proper backend API
   - Add real file storage (e.g., S3)
   - Add user authentication
   - Implement file sharing

2. **Performance Optimization**

   - Add virtualization for large collections
   - Implement proper image optimization
   - Add lazy loading for media files

3. **Features**
   - Add file preview
   - Add support for audio files
   - Add Drag and drop files from desktop for file upload
   - Add support for creating new folders
   - Add sorting options
   - Add more hotkeys(e.g `Ctrl/Cmd+A` to select all files), for now I only implemented `Esc` to clear selection.
   - Keyboard support for navigation and selection
   - Responsive design
