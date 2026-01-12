/** @jsxImportSource hono/jsx */
import { ArticleCard } from "./src/components/ArticleCard";
import { Article } from "./src/data/types";

// Mock article
const mockArticle: Article = {
  slug: 'test-article',
  title: 'Test Title',
  excerpt: 'Test Excerpt',
  publishDate: '2024-01-01',
  category: 'resume',
  content: <p>Content</p>
};

// Simple output to confirm script runs and imports succeed
console.log("Imports successful.");
console.log("Mock Article Category:", mockArticle.category);
