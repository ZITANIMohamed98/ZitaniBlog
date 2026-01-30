# React Blog Starter

A modern, fully-featured blog starter template built with React, TypeScript, and Vite. This template provides a solid foundation for creating a personal blog with a clean, responsive design.

## Features

- ⚡️ **Fast Development** - Built with Vite for lightning-fast HMR and builds
- 🎯 **TypeScript** - Full type safety throughout the application
- 🎨 **Modern Design** - Clean, responsive UI that works on all devices
- 🧭 **React Router** - Client-side routing for smooth navigation
- 📝 **Markdown Support** - Simple markdown rendering for blog posts
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

## Customization

### Adding Blog Posts

Edit the `src/data/blogPosts.ts` file to add, remove, or modify blog posts. Each post follows this structure:

```typescript
{
  id: 'unique-id',
  title: 'Your Post Title',
  excerpt: 'A brief summary of your post',
  content: `
    # Your markdown content here
    
    Use standard markdown formatting...
  `,
  author: 'Author Name',
  date: '2024-01-15',
  readTime: 5,
  tags: ['Tag1', 'Tag2'],
}
```

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
- Full-featured markdown parser (e.g., marked, remark)
- Syntax highlighting for code blocks (e.g., Prism, highlight.js)
- Search functionality
- Tags/categories filtering
- RSS feed generation
- SEO optimization with React Helmet
- Comments system
- CMS integration (e.g., Contentful, Sanity)

## License

MIT License - feel free to use this template for your own projects!

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
