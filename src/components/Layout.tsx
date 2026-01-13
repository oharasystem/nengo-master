import { html, raw } from "hono/html";
import { Child } from "hono/jsx";
import { Translation } from "../locales/types";
import { PRODUCTION_URL } from "../utils/url";

type Props = {
    title: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    children: Child;
    lang: string;
    dict: Translation;
    path: string;
    env?: string;
};

const SUPPORTED_LANGS = ['ja', 'en', 'zh', 'vi', 'ko', 'pt', 'es'];

export const Layout = (props: Props) => {
    const { lang, dict, path, env } = props;

    // Helper to generate alternate links
    // path comes as e.g. "/year/2024" or "/"
    // We want to generate /en/year/2024, /zh/year/2024 etc.
    // Base URL assumed to be origin
    const origin = PRODUCTION_URL;

    // Normalize path to not have leading slash duplication if empty
    const cleanPath = path.startsWith('/') ? path : '/' + path;

    const hreflangs = SUPPORTED_LANGS.map(l => {
        let href = "";
        if (l === 'ja') {
            href = `${origin}${cleanPath}`;
        } else {
            // For root path "/", cleanPath is "/", so /en/
            // For "/year/2024", cleanPath is "/year/2024", so /en/year/2024
            if (cleanPath === '/') {
                 href = `${origin}/${l}/`;
            } else {
                 href = `${origin}/${l}${cleanPath}`;
            }
        }
        return html`<link rel="alternate" hreflang="${l}" href="${href}" />`;
    });

    // x-default should point to ja
    hreflangs.push(html`<link rel="alternate" hreflang="x-default" href="${origin}${cleanPath}" />`);

    const title = props.title.includes(dict.header.title) ? props.title : `${props.title} - ${dict.header.title}`;
    const description = props.description || dict.meta.description;
    const keywords = props.keywords || dict.meta.keywords;
    const url = props.url || `${origin}${lang === 'ja' ? '' : '/' + lang}${cleanPath}`;
    const image = props.image || `${origin}/og-image.png`;

    // Client-side config injection
    const appConfig = {
        labels: dict.home,
        trivia: dict.trivia,
        resume: dict.resume,
        common: dict.common
    };

    return html`<!DOCTYPE html>
    <html lang="${lang}" prefix="og: http://ogp.me/ns#">
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

        ${env === 'production' ? html`
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FCLQYQQWP4"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FCLQYQQWP4');
        </script>
        ` : ''}

        ${hreflangs}

        <!-- Open Graph -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:site_name" content="${dict.header.title}" />
        <meta property="og:locale" content="${lang === 'ja' ? 'ja_JP' : lang}" />

        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nengo_master" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />

        <!-- Structured Data (JSON-LD) -->
        <script type="application/ld+json">
          ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": dict.header.title,
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
        <script>
            window.AppConfig = ${raw(JSON.stringify(appConfig))};

            // Global Copy Function
            window.copyToClipboard = function(text, btn) {
                 navigator.clipboard.writeText(text).then(function() {
                     showToast(window.AppConfig.common.copied);
                 }).catch(function(err) {
                     console.error('Could not copy text: ', err);
                 });
            };

            function showToast(msg) {
                // Remove existing toast if any
                var existing = document.getElementById('toast-notification');
                if (existing) existing.remove();

                var div = document.createElement('div');
                div.id = 'toast-notification';
                div.textContent = msg;
                div.style.cssText = "position:fixed; top:20%; left:50%; transform:translate(-50%, -50%); background:rgba(34, 33, 91, 0.9); color:white; padding:10px 20px; border-radius:30px; z-index:9999; font-size:14px; font-weight:bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display:flex; items-center:center; gap:8px;";

                // Add Check Icon
                var icon = document.createElement('span');
                icon.innerHTML = '✓';
                div.prepend(icon);

                document.body.appendChild(div);

                // Fade out
                setTimeout(function() {
                    div.style.transition = "opacity 0.5s, transform 0.5s";
                    div.style.opacity = "0";
                    div.style.transform = "translate(-50%, -20%)"; // Float up
                    setTimeout(function() { div.remove(); }, 500);
                }, 2000);
            }
        </script>
      </head>
      <body class="bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden h-screen w-screen flex flex-col">
          <header class="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 h-14 flex-none">
              <div class="h-full w-full max-w-4xl mx-auto px-4 flex items-center justify-center">
                  <a href="${lang === 'ja' ? '/' : '/' + lang + '/'}" class="text-xl font-extrabold text-[#22215B] hover:opacity-80 transition flex items-center gap-2">
                       ${dict.header.title}
                  </a>
              </div>
          </header>
        ${props.children}
        <footer class="bg-slate-100 border-t border-slate-200 py-4 flex-none z-10">
            <div class="max-w-4xl mx-auto px-4 text-center text-sm text-slate-500 flex flex-col gap-2">
                <div class="flex justify-center gap-4 flex-wrap mb-2 border-b border-slate-200 pb-2">
                    <a href="${lang === 'ja' ? '/' : '/' + lang + '/'}" class="hover:text-[#22215B]">${dict.footer.link_home}</a>
                    <span class="text-slate-300">|</span>
                    <a href="${lang === 'ja' ? '/privacy' : '/' + lang + '/privacy'}" class="hover:text-[#22215B]">${dict.footer.link_privacy}</a>
                    <span class="text-slate-300">|</span>
                    <a href="${lang === 'ja' ? '/contact' : '/' + lang + '/contact'}" class="hover:text-[#22215B]">${dict.footer.link_contact}</a>
                </div>
                <div class="flex justify-center gap-4 flex-wrap">
                    ${SUPPORTED_LANGS.map(l => {
                        let link = "";
                        if (l === 'ja') link = cleanPath; // e.g. /year/2024
                        else {
                            if (cleanPath === '/') link = `/${l}/`;
                            else link = `/${l}${cleanPath}`;
                        }
                        const isActive = l === lang;
                        return html`<a href="${link}" class="${isActive ? 'font-bold text-[#22215B]' : 'hover:text-[#22215B]'}">${dict.footer['lang_' + l as keyof typeof dict.footer]}</a>`;
                    })}
                </div>
                <div class="text-xs text-slate-400 mt-2">
                    © ${new Date().getFullYear()} Nengo Master
                </div>
            </div>
        </footer>
      </body>
    </html>`;
};
