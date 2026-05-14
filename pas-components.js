document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    setupSearchLogic();
});

function renderHeader() {
    const headerHTML = `
        <div id="search-overlay">
            <div class="search-input-wrapper" style="flex:1; max-width:1000px; margin:0 auto; position:relative;">
                <input type="text" id="overlay-search-input" 
                       style="width:100%; border:none; font-size:28px; outline:none; padding:15px 0; font-weight:300;" 
                       placeholder="Hva leter du etter?" autocomplete="off">
                <div id="overlay-results"></div>
            </div>
            <div class="close-search" id="close-search-btn" style="cursor:pointer; font-size:30px;">✕</div>
        </div>
        <header>
            <div class="header-left">
                <img src="PAS logo.png" alt="PAS Logo" class="header-logo" onerror="this.src='https://placehold.co/100x45/003d7a/ffffff?text=PAS'">
                <h1>Det optimale livshjulet</h1>
            </div>
            <div class="search-trigger" id="search-trigger-btn" title="Åpne søk">
                <img src="Søke ikon 2.svg" alt="Søk" onerror="this.src='https://img.icons8.com/ios-filled/50/003d7a/search--v1.png'">
            </div>
        </header>
    `;
    const container = document.getElementById('pas-header-container');
    if (container) container.innerHTML = headerHTML;
}

function renderFooter() {
    const footerHTML = `
        <footer>
            <div class="footer-left">
                <img src="PAS Aktivit med i eget liv logo.png" alt="PAS Logo" class="footer-logo" onerror="this.src='https://placehold.co/200x220/f8fafc/64748b?text=PAS+Logo'">
            </div>
            <div class="footer-center">
                <h2>Positiv atferdsstøtte i Trondheim kommune</h2>
                <p>Et opplæringsnettsted for ansatte i Bo- og aktivitetstilbudene (BOA) og<br>Helse- og omsorgstjenesten for barn og unge (HABU)</p>
                <div class="editor-section" style="margin-top:15px; border-top:1px solid #e2e8f0; padding-top:10px;">
                    <p style="font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Ansvarlig redaktør</p>
                    <p style="font-weight: 600;">[Navn på redaktør]</p>
                </div>
            </div>
            <div class="footer-right">
                <img src="Kommunevåpen Farge Google Site.png" alt="Trondheim Kommune Logo" class="footer-logo" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Trondheim_komm_v%C3%A5pen.svg/400px-Trondheim_komm_v%C3%A5pen.svg.png'">
            </div>
        </footer>
    `;
    const container = document.getElementById('pas-footer-container');
    if (container) container.innerHTML = footerHTML;
}

function setupSearchLogic() {
    const trigger = document.getElementById('search-trigger-btn');
    const overlay = document.getElementById('search-overlay');
    const close = document.getElementById('close-search-btn');
    const input = document.getElementById('overlay-search-input');
    const results = document.getElementById('overlay-results');

    if (!trigger) return;

    trigger.onclick = () => {
        overlay.classList.add('active');
        setTimeout(() => input.focus(), 400);
    };

    close.onclick = () => {
        overlay.classList.remove('active');
        input.value = '';
        results.style.display = 'none';
    };

    input.oninput = (e) => {
        const term = e.target.value.toLowerCase();
        if (term.length < 2) {
            results.style.display = 'none';
            return;
        }

        let matches = [];
        PAS_DATA.forEach(cat => {
            if (cat.mainLabel.toLowerCase().includes(term)) {
                matches.push({ title: cat.mainLabel, cat: 'Hovedområde', link: cat.link });
            }
            cat.slices.forEach(slice => {
                const cleanLabel = slice.label.replace(/\|/g, ' ');
                if (cleanLabel.toLowerCase().includes(term)) {
                    matches.push({ title: cleanLabel, cat: cat.mainLabel, link: slice.link });
                }
            });
        });

        if (matches.length > 0) {
            results.innerHTML = matches.map(m => `
                <div class="search-result-item" onclick="window.location.href='${m.link}'">
                    <div class="search-result-title">${m.title}</div>
                    <div class="search-result-cat">${m.cat}</div>
                </div>
            `).join('');
            results.style.display = 'block';
        } else {
            results.innerHTML = '<div class="search-result-item" style="color: #64748b;">Ingen treff...</div>';
            results.style.display = 'block';
        }
    };
}
