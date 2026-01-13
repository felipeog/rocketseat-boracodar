# Bora Codar - Challenge Tracker

A client-side application to track your progress on **Rocketseat's Bora Codar** frontend challenges.

## Features

- **Challenge Listing** - View all Bora Codar challenges sorted by number
- **Status Tracking** - Mark challenges as Todo, Doing, or Done
- **URL-based Filtering** - Filter challenges by status via routes (`/all`, `/todo`, `/doing`, `/done`)
- **GitHub URL Linking** - Add your repository URL to each completed challenge
- **Import/Export** - Backup and restore your progress as JSON
- **Reset Progress** - Start fresh with a single click
- **Persistent Storage** - Progress automatically saved to localStorage
- **Responsive Design** - Works on desktop and mobile devices
- **Dark/Light Mode** - Respects system color scheme preference

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/felipeog/rocketseat-boracodar.git
cd rocketseat-boracodar

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Deployment

This project includes Netlify configuration for easy deployment. Simply connect your repository to Netlify and it will automatically build and deploy.

The `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirects for client-side routing

## Project Structure

```
src/
├── components/      # React components
├── data/            # Challenge data (JSON)
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main app component with routing
├── main.tsx         # Application entry point
└── index.css        # Global styles
```

## License

MIT
