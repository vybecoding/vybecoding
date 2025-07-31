#!/usr/bin/env node

/**
 * Script to create a test guide for development and testing
 */

const { ConvexHttpClient } = require("convex/browser");

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "https://gentle-kangaroo-406.convex.cloud";

const testGuideContent = `# Complete Guide to Next.js App Router

## Introduction

The Next.js App Router is a powerful new paradigm for building React applications. This comprehensive guide will walk you through everything you need to know to master the App Router.

## Getting Started

### Installation

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --app
cd my-app
npm run dev
\`\`\`

### Project Structure

The App Router uses a file-based routing system:

\`\`\`
app/
  layout.tsx      # Root layout
  page.tsx        # Home page
  about/
    page.tsx      # About page (/about)
  blog/
    page.tsx      # Blog listing (/blog)
    [slug]/
      page.tsx    # Blog post (/blog/[slug])
\`\`\`

## Core Concepts

### 1. Layouts

Layouts are shared UI that wrap around pages. They preserve state and avoid re-rendering.

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}
\`\`\`

### 2. Pages

Pages are unique to a route and are rendered when the route is visited.

\`\`\`tsx
// app/about/page.tsx
export default function About() {
  return <h1>About Page</h1>
}
\`\`\`

### 3. Dynamic Routes

Use square brackets for dynamic segments:

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Blog Post: {params.slug}</h1>
}
\`\`\`

## Advanced Patterns

### Server Components

By default, components in the app directory are Server Components:

- Rendered on the server
- Can fetch data directly
- No JavaScript sent to client
- Better performance and SEO

### Client Components

Use the "use client" directive for interactive components:

\`\`\`tsx
"use client"

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

### Data Fetching

Server Components can fetch data directly:

\`\`\`tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts')
  return res.json()
}

export default async function Blog() {
  const posts = await getPosts()
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  )
}
\`\`\`

## Performance Optimization

### 1. Loading UI

Create loading.tsx files for instant loading states:

\`\`\`tsx
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading blog posts...</div>
}
\`\`\`

### 2. Error Handling

Create error.tsx files for error boundaries:

\`\`\`tsx
// app/blog/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
\`\`\`

### 3. Metadata

Generate dynamic metadata for SEO:

\`\`\`tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}
\`\`\`

## Production Deployment

### Vercel (Recommended)

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Self-Hosting

\`\`\`bash
npm run build
npm start
\`\`\`

## Best Practices

1. **Use Server Components by default** - Only use Client Components when needed
2. **Colocate related files** - Keep components, styles, and tests together
3. **Leverage parallel routes** - Use @folder notation for complex layouts
4. **Optimize images** - Use next/image for automatic optimization
5. **Implement proper error boundaries** - Handle errors gracefully

## Conclusion

The Next.js App Router provides a powerful foundation for modern web applications. By understanding these core concepts and patterns, you'll be able to build fast, scalable, and maintainable applications.

Remember to always check the [official documentation](https://nextjs.org/docs) for the latest updates and best practices.

Happy coding! 🚀`;

async function createTestGuide() {
  console.log("Creating test guide...");
  
  try {
    const client = new ConvexHttpClient(CONVEX_URL);
    
    // First check if any guides already exist
    console.log("Checking existing guides...");
    const existingGuides = await client.query("guides:getPublishedGuides", {});
    console.log(`Found ${existingGuides.guides?.length || 0} existing guides`);
    
    if (existingGuides.guides && existingGuides.guides.length > 0) {
      console.log("\nExisting guides:");
      existingGuides.guides.forEach((guide, index) => {
        console.log(`${index + 1}. "${guide.title}" (slug: ${guide.slug})`);
      });
      
      console.log("\nYou can test the guide detail route with these existing guides:");
      existingGuides.guides.forEach(guide => {
        console.log(`- http://localhost:3000/guides/${guide.slug}`);
      });
      
      return;
    }
    
    console.log("\nNo guides found. Creating a test guide...");
    console.log("Note: You'll need to be authenticated to create guides.");
    console.log("Please sign in to the app first, then run this script again.");
    
    console.log("\nTest guide structure would be:");
    console.log({
      title: "Complete Guide to Next.js App Router",
      category: "tutorials",
      difficulty: "intermediate",
      tags: ["nextjs", "react", "javascript", "app-router"],
      content: "... (full markdown content)",
      excerpt: "Master the Next.js App Router with this comprehensive guide covering layouts, pages, dynamic routes, and performance optimization."
    });
    
  } catch (error) {
    console.error("Error:", error);
  }
}

createTestGuide();