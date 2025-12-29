import { html } from "hono/html";

type Props = {
    title: string;
    description?: string;
    keywords?: string;
    url?: string;
    image?: string;
    children: any;
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
        <meta name="theme-color" content="#4f46e5" />
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
        </style>
      </head>
      <body class="bg-gray-100 text-gray-800 font-sans antialiased overflow-hidden h-screen w-screen flex flex-col">
        ${props.children}
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                const triggerAd = document.getElementById('trigger-ad');
                const triggerEra = document.getElementById('trigger-era');
                const modalAd = document.getElementById('modal-ad');
                const modalEra = document.getElementById('modal-era');
                const closeAd = document.getElementById('close-ad');
                const closeEra = document.getElementById('close-era');
                const modalContentAd = document.getElementById('modal-content-ad');
                const modalContentEra = document.getElementById('modal-content-era');
                const pickerAd = document.getElementById('picker-ad');
                const pickerEra = document.getElementById('picker-era');
                const displayAd = document.getElementById('display-ad');
                const displayEra = document.getElementById('display-era');

                // --- Modal Logic ---
                const openModal = (modal, content, picker) => {
                    if (!modal) return;
                    modal.classList.remove('hidden');
                    void modal.offsetWidth; 
                    modal.classList.remove('opacity-0');
                    if (content) {
                        content.classList.remove('translate-y-full', 'sm:scale-95');
                        content.classList.add('translate-y-0', 'sm:scale-100');
                    }
                    
                    // Sync Scroll to Current Year
                    if (picker && displayAd) {
                        const currentYear = parseInt(displayAd.textContent.replace(/[^\d]/g, '')) || 1989;
                        const targetItem = picker.querySelector(\`.year-item[data-year="\${currentYear}"]\`);
                        if (targetItem) {
                            // Instant scroll to avoid visual jumping if possible, or smooth if preferred. Instant is better for initial open.
                            targetItem.scrollIntoView({ behavior: 'instant', block: 'center' });
                            updateActiveStyle(picker, targetItem);
                        }
                    }
                };

                const closeModal = (modal, content) => {
                    if (!modal) return;
                    modal.classList.add('opacity-0');
                    if (content) {
                        content.classList.add('translate-y-full', 'sm:scale-95');
                        content.classList.remove('translate-y-0', 'sm:scale-100');
                    }
                    setTimeout(() => {
                        modal.classList.add('hidden');
                    }, 300);
                };

                // Triggers
                if (triggerAd && modalAd) triggerAd.addEventListener('click', () => openModal(modalAd, modalContentAd, pickerAd));
                if (triggerEra && modalEra) triggerEra.addEventListener('click', () => openModal(modalEra, modalContentEra, pickerEra));

                // Closers
                if (closeAd && modalAd) closeAd.addEventListener('click', () => closeModal(modalAd, modalContentAd));
                if (closeEra && modalEra) closeEra.addEventListener('click', () => closeModal(modalEra, modalContentEra));
                
                // Overlay Click
                [modalAd, modalEra].forEach((m, i) => {
                    if (m) {
                        const c = i === 0 ? modalContentAd : modalContentEra;
                        m.addEventListener('click', (e) => {
                            if (e.target === m) closeModal(m, c);
                        });
                    }
                });

                // --- Picker Logic ---
                
                const updateActiveStyle = (container, activeItem) => {
                    container.querySelectorAll('.year-item').forEach(item => {
                        item.classList.remove('text-indigo-600', 'scale-125', 'opacity-100');
                        item.classList.add('text-gray-400', 'scale-100', 'opacity-50');
                    });
                    if (activeItem) {
                        activeItem.classList.remove('text-gray-400', 'scale-100', 'opacity-50');
                        activeItem.classList.add('text-indigo-600', 'scale-125', 'opacity-100');
                    }
                };

                const adjustPadding = (el) => {
                    if (!el || el.clientHeight === 0) return;
                    const halfHeight = el.clientHeight / 2;
                    const halfItemHeight = 32; 
                    const pad = halfHeight - halfItemHeight;
                    el.style.paddingTop = \`\${pad}px\`;
                    el.style.paddingBottom = \`\${pad}px\`;
                };

                const adjustAllPadding = () => {
                    adjustPadding(pickerAd);
                    adjustPadding(pickerEra);
                };
                window.addEventListener('resize', adjustAllPadding);

                // Initial Padding Adjustment
                // We also need to adjust when modal opens because dimensions might be 0 initially
                const layoutObserver = new MutationObserver((mutations) => {
                    mutations.forEach(m => {
                        if (m.type === 'attributes' && m.attributeName === 'class') {
                            const target = m.target;
                            if (!target.classList.contains('hidden')) {
                                setTimeout(() => adjustAllPadding(), 10);
                            }
                        }
                    });
                });
                if (modalAd) layoutObserver.observe(modalAd, { attributes: true });
                if (modalEra) layoutObserver.observe(modalEra, { attributes: true });


                // Scroll Handler Factory
                const setupPickerLogic = (picker) => {
                    if (!picker) return;
                    
                    let timeout;
                    picker.addEventListener('scroll', () => {
                        clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            const centerY = picker.scrollTop + picker.clientHeight / 2;
                            let closestItem = null;
                            let minDiff = Infinity;
                            
                            picker.querySelectorAll('.year-item').forEach(item => {
                                const rect = item.getBoundingClientRect();
                                const containerRect = picker.getBoundingClientRect();
                                const itemCenter = rect.top + rect.height / 2;
                                const containerCenter = containerRect.top + containerRect.height / 2;
                                const diff = Math.abs(itemCenter - containerCenter);
                                if (diff < minDiff) {
                                    minDiff = diff;
                                    closestItem = item;
                                }
                            });

                            if (closestItem) {
                                updateActiveStyle(picker, closestItem);
                                const year = closestItem.dataset.year;
                                
                                // Fetch Data & Update Inputs
                                fetch('/api/trivia/' + year)
                                    .then(res => res.json())
                                    .then(data => {
                                        if (displayAd) displayAd.textContent = data.year + '年';
                                        if (displayEra) displayEra.textContent = data.era;

                                        const triviaContainer = document.getElementById('trivia-container');
                                        if (triviaContainer) {
                                            triviaContainer.innerHTML = \`
                                                <div class="bg-white p-4 rounded-lg shadow mb-4">
                                                    <h3 class="font-bold text-gray-500 text-sm mb-1">その年の出来事</h3>
                                                    <p class="text-lg">\${data.trivia.highlight_event || '特になし'}</p>
                                                </div>
                                                <div class="bg-white p-4 rounded-lg shadow">
                                                    <h3 class="font-bold text-gray-500 text-sm mb-1">その年のヒット曲</h3>
                                                    <p class="text-lg">\${data.trivia.hit_song || '情報なし'}</p>
                                                </div>
                                            \`;
                                        }
                                    });
                            }
                        }, 50); // Fast debounce
                    });

                    // Click to select
                    picker.querySelectorAll('.year-item').forEach(item => {
                        item.addEventListener('click', () => {
                            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        });
                    });
                };

                setupPickerLogic(pickerAd);
                setupPickerLogic(pickerEra);
            });
        </script>
      </body>
    </html>`;
};
