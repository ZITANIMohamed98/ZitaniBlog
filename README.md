# React Blog Starter

A modern, fully-featured blog starter template built with React, TypeScript, and Vite. This template provides a solid foundation for creating a personal blog with a clean, responsive design.

## Features

- ⚡️ **Fast Development** - Built with Vite for lightning-fast HMR and builds
- 🎯 **TypeScript** - Full type safety throughout the application
- 🎨 **Modern Design** - Clean, responsive UI that works on all devices
- 🧭 **React Router** - Client-side routing for smooth navigation
- 📝 **Markdown Support** - Simple markdown rendering for blog posts
- 🗄️ **Supabase Integration** - Cloud-based PostgreSQL database for content storage
- ✍️ **CMS Interface** - Built-in admin panel for creating and managing blog posts
- 🌗 **Dark/Light Mode** - Automatic theme switching based on system preferences
- 🎨 **Customizable** - Easy to modify colors, styles, and content

## Project Structure

```
react-blog-starter/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── BlogCard.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── BlogPost.tsx
│   │   └── About.tsx
│   ├── data/            # Static data and content
│   │   └── blogPosts.ts
│   ├── types/           # TypeScript type definitions
│   │   └── blog.ts
│   ├── utils/           # Utility functions
│   │   └── markdown.tsx
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository (or use it as a template):
   ```bash
   git clone <your-repo-url>
   cd react-blog-starter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Using the CMS

### Managing Blog Posts

The blog now includes a built-in CMS (Content Management System) for creating and managing posts:

1. **Access the Admin Panel**: Navigate to `/admin` in your browser
2. **Create Posts**: Click "+ Create New Post" and fill in the form
3. **Edit Posts**: Click "Edit" next to any post in the admin panel
4. **Delete Posts**: Click "Delete" to remove a post (with confirmation)

All posts are stored in Supabase and fetched dynamically. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.

### Legacy: Static Posts

The old `src/data/blogPosts.ts` file is still present but no longer used. All posts should now be managed through the CMS interface.

### Styling

The project uses CSS modules for component-specific styles. Global styles are in:
- `src/index.css` - Global styles and theme colors
- `src/App.css` - App-level layout styles

To customize the color scheme, modify the color values in the CSS files. The main accent color is defined using `rgba(100, 108, 255, ...)` throughout.

### Modifying the Header/Footer

- Edit `src/components/Header.tsx` to change navigation links or branding
- Edit `src/components/Footer.tsx` to update footer content and social links

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Update `vite.config.ts` with your repo name:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ...
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Technologies Used

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - Routing

## Future Enhancements

Consider adding:
- **Authentication**: Supabase Auth to protect the admin panel
- **Image Uploads**: Supabase Storage for cover image uploads
- **Markdown Editor**: Rich text editor with live preview (e.g., MDX Editor)
- **Syntax Highlighting**: Code highlighting for code blocks (e.g., Prism, highlight.js)
- **Search**: Full-text search functionality with Supabase
- **Filtering**: Tags and categories filtering on the home page
- **RSS Feed**: Auto-generated RSS feed for blog subscribers
- **SEO**: Meta tags and Open Graph optimization
- **Comments**: Comment system (e.g., using Supabase Realtime)
- **Post Scheduling**: Schedule posts for future publication
- **Draft Mode**: Save posts as drafts before publishing
- **Analytics**: Track post views and engagement

## License

MIT License - feel free to use this template for your own projects!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
