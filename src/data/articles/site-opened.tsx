/** @jsxImportSource hono/jsx */
import { Article } from "../types";

export const siteOpened: Article = {
  slug: 'site-opened',
  title: '年号マスターを開設しました',
  excerpt: '西暦・和暦の変換ツール「年号マスター」を公開しました。便利な機能を紹介します。',
  publishDate: '2024-05-20',
  content: (
    <>
      <p className="mb-4">
        はじめまして。この度、西暦と和暦を簡単に変換できるWebサイト「年号マスター」を開設いたしました。
      </p>
      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">サイトの目的</h2>
      <p className="mb-4">
        日常生活や仕事の中で、「今年は令和何年だっけ？」「平成12年は西暦何年？」と迷うことはありませんか？
        そんな時に、スマホからサッと確認できるツールがあれば便利だと思い、このサイトを作りました。
      </p>
      <h2 className="text-xl font-bold text-slate-700 mt-8 mb-4">主な機能</h2>
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
          <li>西暦・和暦の相互変換</li>
          <li>入学・卒業年度の自動計算</li>
          <li>年齢早見表</li>
      </ul>
      <p className="mb-4">
          今後とも「年号マスター」をよろしくお願いいたします。
      </p>
    </>
  )
};
