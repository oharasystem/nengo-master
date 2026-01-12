import { Child } from "hono/jsx";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  content: Child;
}
