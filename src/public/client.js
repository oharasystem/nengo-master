function calculateResume() {
    const year = document.getElementById('birthYear').value;
    const isEarly = document.getElementById('earlyBirthday').checked;

    if (!year) return;

    // 早生まれなら1月1日(前年度扱い)、そうでなければ5月1日(今年度扱い)として計算
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
            alert("エラー: " + data.error);
            return;
        }

        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex justify-between border-b border-gray-100 pb-2 last:border-0';
            li.innerHTML = `<span class="font-bold text-gray-600">${item.label}</span> <span class="text-indigo-600 font-mono">${item.year}年${item.month}月</span>`;
            list.appendChild(li);
        });
        document.getElementById('resume-result').classList.remove('hidden');
    })
    .catch(err => {
        console.error("Network or parsing error", err);
        alert("計算に失敗しました。通信環境を確認してください。");
    });
}

// Make it available globally so the form onsubmit can call it
window.calculateResume = calculateResume;
