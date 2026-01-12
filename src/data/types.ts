import { Child } from "hono/jsx";

export type ArticleCategory = 'resume' | 'knowledge' | 'history' | 'calc' | 'other';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  content: Child;
  thumbnailUrl?: string;
  category: ArticleCategory;
}
