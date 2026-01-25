import { Article } from "../data/types";

/**
 * 公開日が現在日付以前かどうかを判定する
 * @param publishDate - YYYY-MM-DD形式の公開日
 * @returns 公開済みの場合true
 */
export function isPublished(publishDate: string): boolean {
  const today = new Date();
  // 時刻を00:00:00にリセットして日付のみで比較
  today.setHours(0, 0, 0, 0);

  const pubDate = new Date(publishDate);
  pubDate.setHours(0, 0, 0, 0);

  return pubDate <= today;
}

/**
 * 公開済みの記事のみをフィルタリングして返す
 * @param articles - 全記事配列
 * @returns 公開済みの記事のみの配列
 */
export function getPublishedArticles(articles: Article[]): Article[] {
  return articles.filter((article) => isPublished(article.publishDate));
}
