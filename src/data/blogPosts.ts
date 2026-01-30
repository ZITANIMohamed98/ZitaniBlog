import type { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a React project with TypeScript and best practices for building type-safe applications.',
    content: `
# Getting Started with React and TypeScript

TypeScript has become an essential tool for modern React development. It provides type safety, better IDE support, and helps catch errors early in the development process.

## Why TypeScript?

TypeScript adds static typing to JavaScript, which means you can catch many bugs at compile time rather than runtime. When working with React, TypeScript helps you:

- Define prop types with interfaces
- Ensure component usage is correct
- Get better autocomplete and IntelliSense
- Refactor code with confidence

## Setting Up Your Project

The easiest way to start a new React TypeScript project is using Vite:

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
\`\`\`

## Basic Component Example

Here's a simple typed React component:

\`\`\`typescript
interface Props {
  title: string;
  count: number;
}

const Counter: React.FC<Props> = ({ title, count }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Count: {count}</p>
    </div>
  );
};
\`\`\`

## Conclusion

TypeScript and React work beautifully together. Start small, add types gradually, and you'll soon appreciate the benefits of type safety in your React applications.
    `,
    author: 'Jane Doe',
    date: '2024-01-15',
    readTime: 5,
    tags: ['React', 'TypeScript', 'Tutorial'],
  },
  {
    id: '2',
    title: 'Building Responsive Layouts with CSS Grid',
    excerpt: 'Discover the power of CSS Grid for creating flexible, responsive layouts without media queries.',
    content: `
# Building Responsive Layouts with CSS Grid

CSS Grid has revolutionized how we build layouts on the web. Unlike traditional methods, Grid allows you to create complex, responsive designs with minimal code.

## What is CSS Grid?

CSS Grid is a two-dimensional layout system that lets you control both rows and columns simultaneously. This makes it perfect for building complex layouts that were previously difficult or impossible to achieve.

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
\`\`\`

This simple rule creates a responsive grid that automatically adjusts the number of columns based on available space.

## Key Concepts

- **Grid Container**: The parent element with \`display: grid\`
- **Grid Items**: Direct children of the grid container
- **Grid Lines**: The dividing lines that make up the structure
- **Grid Tracks**: The space between two grid lines
- **Grid Areas**: Rectangular areas made up of grid cells

## Real-World Example

Here's a common blog layout:

\`\`\`css
.blog-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 250px 1fr 1fr;
  gap: 20px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Conclusion

CSS Grid is a powerful tool that should be in every web developer's toolkit. Start experimenting with it today and watch your layouts become more elegant and maintainable.
    `,
    author: 'John Smith',
    date: '2024-01-20',
    readTime: 7,
    tags: ['CSS', 'Web Design', 'Layout'],
  },
  {
    id: '3',
    title: 'Understanding React Hooks: A Deep Dive',
    excerpt: 'Master React Hooks with this comprehensive guide covering useState, useEffect, and custom hooks.',
    content: `
# Understanding React Hooks: A Deep Dive

React Hooks transformed how we write React components by allowing us to use state and lifecycle features in functional components.

## The Basics: useState

The \`useState\` hook is your entry point to stateful functional components:

\`\`\`typescript
const [count, setCount] = useState(0);

const increment = () => setCount(count + 1);
\`\`\`

## Side Effects: useEffect

The \`useEffect\` hook handles side effects in your components:

\`\`\`typescript
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

The dependency array tells React when to re-run the effect.

## Custom Hooks

You can create your own hooks to share logic between components:

\`\`\`typescript
function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
\`\`\`

## Rules of Hooks

1. Only call hooks at the top level
2. Only call hooks from React functions
3. Use the ESLint plugin to enforce these rules

## Conclusion

Hooks make React code more reusable and easier to understand. They're now the recommended way to write React components, so invest time in learning them well.
    `,
    author: 'Emily Chen',
    date: '2024-01-25',
    readTime: 8,
    tags: ['React', 'Hooks', 'JavaScript'],
  },
];
