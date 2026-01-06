# Nengo-Master (年号マスター) 技術仕様書

## 1. プロダクト概要
**Nengo-Master** は、西暦・和暦の変換、年齢確認、履歴書作成（入学・卒業年度）の煩わしさを解消するユーティリティWebアプリ。
iPhoneのドラムロール（ピッカー）のような直感的なUIで年を選択すると、即座に変換結果と「その年のトリビア」を表示し、ビジネスや日常会話のネタを提供する。

## 2. システムアーキテクチャ & プロジェクト構成

Cloudflare Workers上でHonoを動作させるサーバーレス/エッジ構成を採用。低レイテンシでのレスポンスを実現する。

### 技術スタック
- **Runtime:** Cloudflare Workers
- **Framework:** Hono (v4.x)
- **Data Source:** In-Memory Constant (TypeScript)
- **UI/Styling:** Hono JSX (Server-Side Rendering) + TailwindCSS (CDN)
- **Client Logic:** Vanilla TS/JS (External file: `src/public/client.js`)
- **Node.js:** v20 (Required)

### ディレクトリ構成 (Monorepo / Hono Standard)

```text
nengo-master/
├── .nvmrc                # Node.js version config (v20)
├── wrangler.toml         # Cloudflare Workers 設定
├── package.json
├── src/
│   ├── index.tsx         # Hono Entry Point & Routing
│   ├── const/            # Constants & Data
│   │   └── historyTimeline.ts # Timeline Data (In-Memory)
│   ├── components/       # JSX Components (UI)
│   │   ├── Layout.tsx    # Base HTML Wrapper
│   │   ├── DrumPicker.tsx # Year Selection UI
│   │   └── TriviaCard.tsx # Trivia Display UI
│   ├── utils/            # Logic Modules
│   │   ├── era.ts        # 和暦・西暦変換ロジック
│   │   └── resume.ts     # 入学・卒業年度計算ロジック
│   └── public/           # Static Assets
│       └── client.js     # Client-side Logic (Scroll, Fetch, UI Update)
└── tsconfig.json
```

## 3. データ構造 (In-Memory Constant)

データベースの代わりとして、TypeScriptの定数オブジェクトで年表データを管理する。
`src/const/historyTimeline.ts`

### Interface: `YearlyTrivia`

```typescript
interface YearlyTrivia {
  year: number;          // 西暦 (例: 1989)
  events: string[];      // その年の主要な出来事 (配列)
  hitSongs: string[];    // その年のヒット曲 (配列)
}
```

## 4. 和暦計算・履歴書計算ロジック仕様

### 4.1 和暦変換ロジック (`src/utils/era.ts`)

**基本方針:**
ユーザー入力は「年」単位を基本とするが、改元が行われた年は情報を「併記」する。
明治、大正、昭和、平成、令和に対応。

### 4.2 履歴書（学歴）計算ロジック (`src/utils/resume.ts`)

**基本方針:**
- 4月1日生まれまでは「早生まれ」として前年度の学年に含める。
- ストレートでの入学・卒業を想定。

**入力パラメータ:**
- `birthDate`: YYYY-MM-DD
  - 早生まれチェックONの場合: YYYY-01-01として計算
  - 早生まれチェックOFFの場合: YYYY-05-01として計算

## 5. API エンドポイント定義

### 5.1 ページ (SSR)
#### `GET /`
- トップページを表示。
- 初期データ（西暦/和暦/トリビア）をサーバー側でプリフェッチしてレンダリング。

### 5.2 データ取得系
#### `GET /api/trivia/:year`
- **Response:**
  ```json
  {
    "year": 1989,
    "era": "平成元年 / 昭和64年",
    "trivia": {
      "events": [
        "昭和天皇崩御、平成改元",
        "消費税(3%)導入",
        "ベルリンの壁崩壊"
      ],
      "hitSongs": [
        "Diamonds (プリンセス・プリンセス)",
        "世界でいちばん熱い夏 (プリンセス・プリンセス)",
        "とんぼ (長渕剛)"
      ]
    }
  }
  ```

### 5.3 計算系
#### `POST /api/calculate/resume`
- **Request:** `{ "birthDate": "2000-05-01" }`
- **Response:** 入学・卒業年度のリスト（小学校入学〜大学卒業）

## 6. UI/UX (Drum Roll)
CSS Scroll Snap (`scroll-snap-type: y mandatory`) を使用し、ネイティブアプリのようなピッカーをWebで再現。
`src/components/Layout.tsx` 内のクライアントサイドスクリプトにより、スクロール停止 (`scroll` event + debounce) を検知して自動的に年を選択し、APIをコールして情報を更新する。