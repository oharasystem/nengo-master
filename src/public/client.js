// Refactored Client JS to use window.AppConfig
const config = window.AppConfig || {};
const labels = config.labels || {
    form_year_suffix: '年'
};
const triviaLabels = config.trivia || {
    events_title: 'その年の出来事',
    songs_title: 'その年のヒット曲',
    empty: '---'
};
const resumeLabels = config.resume || {
    error_input: "エラー: ",
    error_calc: "計算に失敗しました。通信環境を確認してください。",
    result_year_suffix: "年",
    result_month_suffix: "月",
};

function calculateResume() {
    const year = document.getElementById('birthYear').value;
    const isEarly = document.getElementById('earlyBirthday').checked;

    if (!year) return;

    // Early Bird: 01-01 (treated as previous school year), Normal: 05-01 (current school year)
    const month = isEarly ? '01' : '05';
    // Use strictly formatted string
    const birthDate = year + '-' + month + '-01';
    fetch('/api/calculate/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate })
    })
    .then(res => res.json())
    .then(data => {
        const list = document.getElementById('resume-list');
        list.innerHTML = '';

        if (data.error) {
            alert(resumeLabels.error_input + data.error);
            return;
        }

        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex justify-between border-b border-slate-100 pb-2 last:border-0';
            li.innerHTML = `<span class="font-bold text-slate-600">${item.label}</span> <span class="text-[#22215B] font-mono">${item.year}${resumeLabels.result_year_suffix}${item.month}${resumeLabels.result_month_suffix}</span>`;
            list.appendChild(li);
        });
        document.getElementById('resume-result').classList.remove('hidden');
    })
    .catch(err => {
        console.error("Network or parsing error", err);
        alert(resumeLabels.error_calc);
    });
}

// Make it available globally so the form onsubmit can call it
window.calculateResume = calculateResume;


/* --- New Logic for Drum Picker and Dynamic Updates --- */

let currentYear = 1989;
let updateTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initial Year
    const adTextEl = document.getElementById('display-ad');
    if (adTextEl) {
        // Retrieve raw year if possible, but currently we parse text.
        // The HTML should ideally output just the number or we parse efficiently.
        // To be safe against "Year 1989" or "1989年", we extract digits.
        const adText = adTextEl.textContent;
        const match = adText.match(/\d+/);
        if (match) {
            currentYear = parseInt(match[0]);
        }
    }

    // Modals
    setupModal('ad');
    setupModal('era');

    // Pickers
    setupPicker('picker-ad');
    setupPicker('picker-era');
    
    // Adjust padding so first/last items can be centered
    adjustAllPadding();
    window.addEventListener('resize', adjustAllPadding);
});

function adjustPadding(pickerId) {
    const picker = document.getElementById(pickerId);
    if (!picker || picker.clientHeight === 0) return;
    
    // Half height of container - Half height of item (approx 64px / 2 = 32px)
    const halfHeight = picker.clientHeight / 2;
    const halfItemHeight = 32; 
    const pad = halfHeight - halfItemHeight;
    picker.style.paddingTop = `${pad}px`;
    picker.style.paddingBottom = `${pad}px`;
}

function adjustAllPadding() {
    adjustPadding('picker-ad');
    adjustPadding('picker-era');
}

function setupModal(type) {
    const modal = document.getElementById('modal-' + type);
    const trigger = document.getElementById('trigger-' + type);
    const closeBtn = document.getElementById('close-' + type);
    const content = document.getElementById('modal-content-' + type);

    if(!modal || !trigger || !closeBtn) return;

    const open = () => {
        const targetYear = currentYear; // Capture current selected year
        modal.classList.remove('hidden');
        // Check padding when opening as it might have been 0 if hidden
        adjustPadding('picker-' + type);
        
        // Small delay to allow display property to apply before transition
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            content.classList.remove('translate-y-full'); 
        }, 10);
        
        // Wait for layout to settle before scrolling
        setTimeout(() => {
            scrollToYear(targetYear, 'picker-' + type);
        }, 50);
    };

    const close = () => {
        modal.classList.add('opacity-0');
        content.classList.add('translate-y-full');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    };

    trigger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });
}

function scrollToYear(year, pickerId) {
    const picker = document.getElementById(pickerId);
    if (!picker) return;
    
    const target = picker.querySelector(`[data-year="${year}"]`);
    if (target) {
        // Scroll to center
        // Ensure padding is set before calculating center
        if (!picker.style.paddingTop) adjustPadding(pickerId);
        
        // The center position is: target.offsetTop - padding
        // Actually, straightforward: target.offsetTop - (containerHeight/2) + (targetHeight/2)
        // But scroll behavior works on the scrollable area.
        
        const top = target.offsetTop - (picker.clientHeight / 2) + (target.clientHeight / 2);
        picker.scrollTo({ top, behavior: 'instant' });
    }
}

function setupPicker(pickerId) {
    const picker = document.getElementById(pickerId);
    if (!picker) return;

    const items = picker.querySelectorAll('.year-item');
    
    // Click to scroll
    items.forEach(item => {
        item.addEventListener('click', () => {
            const top = item.offsetTop - (picker.clientHeight / 2) + (item.clientHeight / 2);
            picker.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // Custom Wheel Handling for "1 tick = 1 item" feel
    let isScrolling = false;
    const ITEM_HEIGHT = 64; // h-16 is 4rem = 64px

    picker.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (isScrolling) return;
        isScrolling = true;

        // Calculate direction
        const direction = e.deltaY > 0 ? 1 : -1;
        
        // Determine current slot based on scroll position
        // We round to find which item is currently "mostly" centered
        const currentSlot = Math.round(picker.scrollTop / ITEM_HEIGHT);
        const targetSlot = currentSlot + direction;
        const targetTop = targetSlot * ITEM_HEIGHT;

        picker.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });

        // Prevention lock duration
        // 200ms is a good balance between responsiveness and preventing multi-jump
        setTimeout(() => {
            isScrolling = false;
        }, 50); 
    }, { passive: false });

    // Observer to detect centered item
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                // Highlight
                el.classList.add('text-[#22215B]', 'scale-110', 'opacity-100');
                el.classList.remove('text-slate-400', 'opacity-50');
                
                // Update state
                const year = parseInt(el.dataset.year);
                if (currentYear !== year) {
                    currentYear = year;
                    
                    // Debounce update
                    if (updateTimer) clearTimeout(updateTimer);
                    updateTimer = setTimeout(() => {
                        updateAll(year);
                    }, 300); // 300ms debounce
                }
            } else {
                // Unhighlight
                el.classList.remove('text-[#22215B]', 'scale-110', 'opacity-100');
                el.classList.add('text-slate-400', 'opacity-50');
            }
        });
    }, {
        root: picker,
        rootMargin: '-45% 0px -45% 0px', // Narrow center detection
        threshold: 0
    });

    items.forEach(item => observer.observe(item));
}

function updateAll(year) {
    // Update displays locally first for snappiness if possible, but we need API for ERA and Trivia
    // Just fetch.
    
    fetch('/api/trivia/' + year)
        .then(res => res.json())
        .then(data => {
            // Update Displays
            const adEl = document.getElementById('display-ad');
            const eraEl = document.getElementById('display-era');

            const adText = data.year + labels.form_year_suffix;
            if (adEl) {
                 adEl.textContent = adText;
                 const parent = adEl.parentNode;
                 const btn = parent.querySelector('button');
                 if (btn) btn.setAttribute('onclick', `event.stopPropagation(); window.copyToClipboard('${adText}', this)`);
            }
            if (eraEl) {
                eraEl.textContent = data.era;
                const parent = eraEl.parentNode;
                const btn = parent.querySelector('button');
                if (btn) btn.setAttribute('onclick', `event.stopPropagation(); window.copyToClipboard('${data.era}', this)`);
            }

            // Update Share Buttons
            updateShareButtons(data.year, data.era);

            // Update Trivia Container
            renderTrivia(data.trivia);
        })
        .catch(console.error);
}

function renderTrivia(trivia) {
    const container = document.getElementById('trivia-container');
    if (!container) return;

    const eventsHtml = createListHtml(trivia.events);
    const songsHtml = createListHtml(trivia.hitSongs);

    // Re-create the HTML structure matching TriviaCard.tsx
    container.innerHTML = `
      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 transition-all hover:shadow-md">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-teal-100 text-teal-600 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl">📅</span>
            <h3 class="font-bold text-xl text-slate-800">${triviaLabels.events_title}</h3>
        </div>
        <ul class="text-left text-slate-700 list-disc list-inside space-y-2 ml-1">
          ${eventsHtml}
        </ul>
      </div>

      <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
        <div class="flex items-center gap-2 mb-4">
            <span class="bg-pink-100 text-pink-600 p-2 rounded-full h-10 w-10 flex items-center justify-center text-xl">🎵</span>
            <h3 class="font-bold text-slate-800">${triviaLabels.songs_title}</h3>
        </div>
        <ul class="text-left text-slate-700 list-disc list-inside space-y-2 ml-1">
          ${songsHtml}
        </ul>
      </div>
    `;
}

function createListHtml(items) {
    if (!items || items.length === 0) {
        return `<li class="list-none text-slate-400">${triviaLabels.empty}</li>`;
    }
    return items.map(item => `<li>${item}</li>`).join('');
}

function updateShareButtons(year, era) {
    // Current URL (assumed top page or canonical root)
    // We will use the canonical origin for sharing if possible, or just current.
    const url = window.location.origin; // e.g. https://nengomaster.com

    // Construct text
    // "西暦2026年は令和8年です。 #年号マスター"
    // "AD 2026 is Reiwa 8. #YearMaster" (if English was main, but currently logic is mostly JA focused for the share text requirement)
    // We'll stick to Japanese format as requested or simple English if we can detect lang (not easily available in client.js without config).
    // The requirement said: "Top page/Year page case: 'AD 2026 is Reiwa 8...'. Layout: Inside the calculation result card".
    // "西暦2026年は令和8年です。 #年号マスター"
    const text = `西暦${year}年は${era}です。 #年号マスター`;

    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    const xUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodedText}%20${encodedUrl}`;

    // Select all X buttons with id starting with 'home-share-x' or 'resume-share-x'
    // We gave them IDs like `home-share-x`, `resume-share-x`.
    ['home-', 'resume-'].forEach(prefix => {
        const btnX = document.getElementById(prefix + 'share-x');
        const btnLine = document.getElementById(prefix + 'share-line');

        if (btnX) btnX.setAttribute('href', xUrl);
        if (btnLine) btnLine.setAttribute('href', lineUrl);
    });
}
