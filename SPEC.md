# Nengo-Master (年号マスター) 技術仕様書

## 1. プロダクト概要
**Nengo-Master** は、西暦・和暦の変換、年齢確認、履歴書作成（入学・卒業年度）の煩わしさを解消するユーティリティWebアプリ。
iPhoneのドラムロール（ピッカー）のような直感的なUIで年を選択すると、即座に変換結果と「その年のトリビア」を表示し、ビジネスや日常会話のネタを提供する。

### 主な機能拡張
- **多言語ローカライズ**: 日本語に加え、英語、中国語、ベトナム語など多言語に対応。
- **コラム記事**: 履歴書の書き方や和暦に関する知識を提供する記事機能。
- **URL管理**: 環境（本番/開発）に応じた適切なベースURLの生成。

## 2. システムアーキテクチャ & プロジェクト構成

Cloudflare Workers上でHonoを動作させるサーバーレス/エッジ構成を採用。低レイテンシでのレスポンスを実現する。

### 技術スタック
- **Runtime:** Cloudflare Workers
- **Framework:** Hono (v4.x)
- **Language:** TypeScript
- **UI/Styling:** Hono JSX (Server-Side Rendering) + TailwindCSS (CDN)
- **Internationalization:** 自前実装によるロケール管理 (`src/locales`)
- **Client Logic:** Vanilla TS/JS (External file: `src/public/client.js`)
- **Node.js:** v20 (Required)

### ディレクトリ構成 (Monorepo / Hono Standard)

```text
nengo-master/
├── .dev.vars             # 環境変数定義 (Local)
├── wrangler.toml         # Cloudflare Workers 設定
├── package.json
├── src/
│   ├── index.tsx         # Hono Entry Point & Routing
│   ├── const/            # Constants & Data
│   │   └── historyTimeline.ts # 年表データ (西暦/和暦/トリビア)
│   ├── components/       # JSX Components (UI)
│   │   ├── Layout.tsx    # Base HTML Wrapper
│   │   ├── DrumPicker.tsx # 年選択UI
│   │   ├── TriviaCard.tsx # トリビア表示UI
│   │   ├── ArticleCard.tsx # 記事カードコンポーネント
│   │   └── ... (pages and other components)
│   ├── data/             # データ定義
│   │   ├── articles/     # 各言語/カテゴリの記事コンテンツ
│   │   ├── articles.tsx  # 記事データ集約
│   │   └── types.ts      # データ型定義
│   ├── locales/          # 多言語対応リソース
│   │   ├── types.ts      # 翻訳データ型定義
│   │   ├── ja.ts         # 日本語リソース
│   │   └── ... (en, zh, vi, ko, pt, es)
│   ├── utils/            # Logic Modules
│   │   ├── era.ts        # 和暦・西暦変換ロジック
│   │   ├── resume.ts     # 入学・卒業年度計算ロジック
│   │   ├── url.ts        # URL生成・管理ロジック
│   │   ├── yakudoshi.ts  # 厄年計算ロジック
│   │   ├── zodiac.ts     # 十二支計算ロジック
│   │   └── lifeEvents.ts # 人生イベント計算
│   └── public/           # Static Assets
│       └── client.js     # Client-side Logic (Scroll, Fetch, UI Update)
└── tsconfig.json
```

## 3. データ構造 (In-Memory Constant)

データベースの代わりとして、TypeScriptの定数オブジェクトでデータを管理する。

### 3.1 年表データ (`src/const/historyTimeline.ts`)

```typescript
interface YearlyTrivia {
  year: number;          // 西暦 (例: 1989)
  events: string[];      // その年の主要な出来事
  hitSongs: string[];    // その年のヒット曲
}
```

### 3.2 記事データ (`src/data/types.ts`)

```typescript
type ArticleCategory = 'resume' | 'knowledge' | 'history' | 'calc' | 'other';

interface Article {
  slug: string;          // URLスラッグ (例: 'resume-guide')
  title: string;         // 記事タイトル
  excerpt: string;       // 記事抜粋
  publishDate: string;   // 公開日 (YYYY-MM-DD)
  category: ArticleCategory; // カテゴリ
  content: Child;        // 本文 (JSX Element)
  thumbnailUrl?: string; // サムネイル画像URL
}
```

## 4. ロジック仕様

### 4.1 和暦変換 (`src/utils/era.ts`)
- 西暦・和暦の相互変換。
- 明治以降に対応し、改元の年は両方の元号を併記・考慮する。

### 4.2 履歴書計算 (`src/utils/resume.ts`)
- 生年月日から小学校入学〜大学卒業までの年度を計算。
- 早生まれ（1/1〜4/1）の学年調整に対応。
- 留年・浪人なしのストレート入学・卒業を基準とする。

### 4.3 URL管理 (`src/utils/url.ts`)
- 環境変数 `ENVIRONMENT` に応じてベースURLを切り替え。
  - Production: `https://nengo.solooo.dev`
  - Development: `http://localhost:8787`

## 5. API エンドポイント定義

### 5.1 ページ (SSR)
多言語パス (`/:lang/...`) とデフォルトパス (`/`) をサポート。

- `GET /` (or `/:lang`)
  - トップページ。初期データを含むSSR。
- `GET /years` (or `/:lang/years`)
  - 年表一覧ページ。
- `GET /year/:year` (or `/:lang/year/:year`)
  - 年別の詳細ページ。トリビアや和暦情報を表示。
- `GET /age/:age` (or `/:lang/age/:age`)
  - 年齢別の詳細ページ。生まれた年の情報を表示。
- `GET /articles`
  - 記事一覧ページ（現在は日本語のみ想定）。
- `GET /articles/:slug`
  - 記事詳細ページ。

### 5.2 ユーティリティ・リダイレクト
- `GET /this-year` -> 今年のページへリダイレクト
- `GET /next-year` -> 来年のページへリダイレクト
- `GET /last-year` -> 去年のページへリダイレクト
- `GET /sitemap.xml` -> 動的サイトマップ生成

### 5.3 データ取得API
- `GET /api/trivia/:year`
  - 指定年のトリビア情報をJSONで返却。
  - Response: `{ year, era, trivia: { events, hitSongs } }`

### 5.4 計算API
- `POST /api/calculate/resume`
  - 履歴書年度計算。
  - Request: `{ "birthDate": "YYYY-MM-DD" }`
  - Response: 入学・卒業年度のリスト

## 6. UI/UX
- **Drum Roll UI**: `src/components/DrumPicker.tsx` と `client.js` で実装。スクロールスナップを利用したネイティブアプリライクな選択体験。
- **Client-Side Interactions**: バニラJS (`client.js`) により、スクロール完了イベントの検知、APIフェッチ、ページ内DOM更新を高速に行う。