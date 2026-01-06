import { html } from "hono/html";
import { Child } from "hono/jsx";

type Props = {
    title: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    children: Child;
};

export const Layout = (props: Props) => {
    const title = props.title.includes("Nengo Master") ? props.title : `${props.title} - Nengo Master`;
    const description = props.description || "西暦・和暦の変換、年齢確認、入学・卒業年度の自動計算ができる便利ツール。iPhoneのようなドラムロールで直感的に操作可能。";
    const keywords = props.keywords || "年号,西暦,和暦,変換,年齢,履歴書,早生まれ,学校,入学,卒業,計算,ツール,便利";
    const url = props.url || "https://nengo-master.pages.dev";
    const image = props.image || "https://nengo-master.pages.dev/og-image.png";

    return html`<!DOCTYPE html>
    <html lang="ja" prefix="og: http://ogp.me/ns#">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <meta name="keywords" content="${keywords}" />
        <meta name="author" content="Nengo Master" />
        <meta name="theme-color" content="#22215B" />
        <link rel="canonical" href="${url}" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="robots" content="index, follow" />

        <!-- Open Graph -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:site_name" content="Nengo Master" />
        <meta property="og:locale" content="ja_JP" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nengo_master" /> <!-- Placeholder -->
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />

        <!-- Structured Data (JSON-LD) -->
        <script type="application/ld+json">
          ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Nengo Master",
        "url": url,
        "description": description,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY"
        }
    })}
        </script>

        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .snap-y {
            scroll-snap-type: y mandatory;
          }
          .snap-center {
            scroll-snap-align: center;
          }
          .snap-always {
            scroll-snap-stop: always;
          }
        </style>
      </head>
      <body class="bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden h-screen w-screen flex flex-col">
          <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 h-14 flex-none">
              <div class="h-full w-full max-w-4xl mx-auto px-4 flex items-center justify-center">
                  <a href="/" class="text-xl font-extrabold text-[#22215B] hover:opacity-80 transition flex items-center gap-2">
                       年号マスター
                  </a>
              </div>
          </header>
        ${props.children}
      </body>
    </html>`;
};
