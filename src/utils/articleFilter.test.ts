import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isPublished, getPublishedArticles } from "./articleFilter";
import { Article } from "../data/types";

describe("articleFilter", () => {
  beforeEach(() => {
    // 現在日時を2026-01-25に固定
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-25T12:00:00+09:00"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("isPublished", () => {
    it("過去の日付は公開済み", () => {
      expect(isPublished("2026-01-01")).toBe(true);
      expect(isPublished("2025-12-31")).toBe(true);
    });

    it("当日の日付は公開済み", () => {
      expect(isPublished("2026-01-25")).toBe(true);
    });

    it("未来の日付は未公開", () => {
      expect(isPublished("2026-01-26")).toBe(false);
      expect(isPublished("2026-02-01")).toBe(false);
    });
  });

  describe("getPublishedArticles", () => {
    const mockArticles: Article[] = [
      {
        slug: "past-article",
        title: "過去の記事",
        excerpt: "説明",
        publishDate: "2026-01-20",
        content: null as unknown as Article["content"],
        category: "other",
      },
      {
        slug: "today-article",
        title: "今日の記事",
        excerpt: "説明",
        publishDate: "2026-01-25",
        content: null as unknown as Article["content"],
        category: "other",
      },
      {
        slug: "future-article",
        title: "未来の記事",
        excerpt: "説明",
        publishDate: "2026-01-26",
        content: null as unknown as Article["content"],
        category: "other",
      },
    ];

    it("公開済みの記事のみを返す", () => {
      const published = getPublishedArticles(mockArticles);
      expect(published).toHaveLength(2);
      expect(published.map((a) => a.slug)).toEqual([
        "past-article",
        "today-article",
      ]);
    });

    it("未来の記事は含まれない", () => {
      const published = getPublishedArticles(mockArticles);
      expect(published.find((a) => a.slug === "future-article")).toBeUndefined();
    });

    it("空の配列を渡すと空の配列を返す", () => {
      expect(getPublishedArticles([])).toEqual([]);
    });
  });
});
