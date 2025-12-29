# Nengo-Master (年号マスター) 技術仕様書

## 1. プロダクト概要
**Nengo-Master** は、西暦・和暦の変換、年齢確認、履歴書作成（入学・卒業年度）の煩わしさを解消するユーティリティWebアプリ。
iPhoneのドラムロール（ピッカー）のような直感的なUIで年を選択すると、即座に変換結果と「その年のトリビア」を表示し、ビジネスや日常会話のネタを提供する。

## 2. システムアーキテクチャ & プロジェクト構成

Cloudflare Workers上でHonoを動作させるサーバーレス/エッジ構成を採用。低レイテンシでのレスポンスを実現する。

### 技術スタック
- **Runtime:** Cloudflare Workers
- **Framework:** Hono (v4.x)
- **Database:** Cloudflare D1 (SQLite)
- **UI/Styling:** Hono JSX (Server-Side Rendering) + TailwindCSS
- **Client Logic:** Vanilla TS (最小限のインタラクション用)

### ディレクトリ構成 (Monorepo / Hono Standard)

```text
nengo-master/
├── wrangler.toml         # Cloudflare Workers 設定
├── package.json
├── drizzle.config.ts     # D1 Schema管理 (Drizzle ORM推奨)
├── src/
│   ├── index.tsx         # Hono Entry Point & Routing
│   ├── db/
│   │   ├── schema.ts     # D1 Table Definitions
│   │   └── client.ts     # DB Connection
│   ├── logic/
│   │   ├── era.ts        # 和暦・西暦変換ロジック
│   │   └── resume.ts     # 入学・卒業年度計算ロジック
│   ├── components/       # JSX Components (UI)
│   │   ├── Layout.tsx
│   │   ├── DrumPicker.tsx
│   │   └── TriviaCard.tsx
│   └── public/           # Static Assets (Tailwind output, icons)
└── assets/
    └── styles.css        # Tailwind Input
```

## 3. データベーススキーマ設計 (Cloudflare D1)

その年の出来事や流行を格納するための軽量なテーブル設計。

### Table: `year_trivia`

| Column Name | Type | Key | Description |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | PK | Auto Increment |
| `year_ad` | INTEGER | UNIQUE | 西暦 (例: 1989) |
| `highlight_event` | TEXT | | その年の主要な出来事 |
| `hit_song` | TEXT | | その年のヒット曲 |
| `created_at` | INTEGER | | 作成日時 (Unix Timestamp) |

## 4. 和暦計算・履歴書計算ロジック仕様

### 4.1 和暦変換ロジック (Era Conversion)

**基本方針:**
ユーザー入力は「年」単位を基本とするが、改元が行われた年は情報を「併記」する。

| 西暦 | 実装上の扱い | UI表示例 | 備考 |
| :--- | :--- | :--- | :--- |
| 1926 | Taisho / Showa | 大正15年 / 昭和元年 | 12/25 改元 |
| 1989 | Showa / Heisei | 昭和64年 / 平成元年 | 1/7 改元 (昭和は僅か7日間) |
| 2019 | Heisei / Reiwa | 平成31年 / 令和元年 | 5/1 改元 |

### 4.2 履歴書（学歴）計算ロジック

**基本方針:**
- 4月1日生まれまでは「早生まれ」として前年度の学年に含める。
- 留年や浪人は考慮せず、ストレートでの入学・卒業をデフォルトとする。

**計算フロー:**
1. 入力: 生年月日 (YYYY-MM-DD)
2. 学年基準年度 = (月 <= 3 OR (月=4 AND 日=1)) ? 生まれ年-1 : 生まれ年
3. 小学校入学: 基準年度 + 7 (4月)
4. 小学校卒業: 基準年度 + 13 (3月)
5. 中学校卒業: 基準年度 + 16 (3月)
6. 高校卒業: 基準年度 + 19 (3月)
7. 大学卒業: 基準年度 + 23 (3月)

## 5. API エンドポイント定義

### 5.1 データ取得系
#### `GET /api/trivia/:year`
- **Response:**
  ```json
  {
    "year": 1989,
    "era": "平成元年 / 昭和64年",
    "trivia": {
      "highlight_event": "昭和天皇崩御、平成改元、消費税(3%)導入",
      "hit_song": "Diamonds (プリンセス・プリンセス)"
    }
  }
  ```

### 5.2 計算系
#### `POST /api/calculate/resume`
- **Request:** `{ "birthDate": "2000-02-15" }`
- **Response:** 入学・卒業年度のリスト

## 6. UI/UX (Drum Roll)
CSS Scroll Snap (`scroll-snap-type: y mandatory`) を使用し、ネイティブアプリのようなピッカーをWebで再現する。JavaScriptはスクロール停止イベントの検知とAPIコールのみを担当する。