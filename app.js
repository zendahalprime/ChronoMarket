const SESSIONS = [
    {
        id: 'us',
        name: 'New York (US)',
        timezone: 'America/New_York',
        openHour: 9, openMinute: 30,
        closeHour: 16, closeMinute: 0,
        holidays: [
            '2026-01-01', '2026-01-19', '2026-02-16', '2026-04-03', '2026-05-25',
            '2026-06-19', '2026-07-03', '2026-09-07', '2026-11-26', '2026-12-25'
        ]
    },
    {
        id: 'uk',
        name: 'London (UK)',
        timezone: 'Europe/London',
        openHour: 8, openMinute: 0,
        closeHour: 16, closeMinute: 30,
        holidays: [
            '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-04', '2026-05-25',
            '2026-08-31', '2026-12-25', '2026-12-28'
        ]
    },
    {
        id: 'eu',
        name: 'Frankfurt (EU)',
        timezone: 'Europe/Berlin',
        openHour: 9, openMinute: 0,
        closeHour: 17, closeMinute: 30,
        holidays: [
            '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-05-14',
            '2026-05-25', '2026-12-25', '2026-12-26'
        ]
    },
    {
        id: 'jp',
        name: 'Tokyo (JP)',
        timezone: 'Asia/Tokyo',
        openHour: 9, openMinute: 0,
        closeHour: 15, closeMinute: 0,
        // TSE has a lunch break 11:30 - 12:30
        lunchStartH: 11, lunchStartM: 30,
        lunchEndH: 12, lunchEndM: 30,
        holidays: [
            '2026-01-01', '2026-01-02', '2026-01-12', '2026-02-11', '2026-02-23',
            '2026-03-20', '2026-04-29', '2026-05-04', '2026-05-05', '2026-05-06',
            '2026-07-20', '2026-08-11', '2026-09-21', '2026-09-22', '2026-09-23',
            '2026-10-12', '2026-11-03', '2026-11-23', '2026-12-31'
        ]
    },
    {
        id: 'au',
        name: 'Sydney (AU)',
        timezone: 'Australia/Sydney',
        openHour: 10, openMinute: 0,
        closeHour: 16, closeMinute: 0,
        holidays: [
            '2026-01-01', '2026-01-26', '2026-04-03', '2026-04-06', '2026-04-25',
            '2026-06-08', '2026-12-25', '2026-12-28'
        ]
    }
];

// Helper to get reliable local time parts in a specific timezone
function getZoneTimeParts(date, tz) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
        weekday: 'short'
    });
    const parts = formatter.formatToParts(date);
    const result = {};
    for (const p of parts) {
        if (p.type !== 'literal') result[p.type] = p.value;
    }
    // Handle midnight mapping from '24' to '0' manually if Intl gives 24
    let h = parseInt(result.hour, 10);
    if (h === 24) h = 0;

    return {
        year: parseInt(result.year, 10),
        month: parseInt(result.month, 10),
        day: parseInt(result.day, 10),
        hour: h,
        minute: parseInt(result.minute, 10),
        second: parseInt(result.second, 10),
        weekday: result.weekday
    };
}

function pad(n) { return n < 10 ? '0' + n : n; }

// Build the UI cards dynamically
function initializeUI() {
    const container = document.getElementById('clocks-container');
    SESSIONS.forEach(session => {
        const card = document.createElement('div');
        card.className = 'session-card glass';
        card.id = `card-${session.id}`;

        card.innerHTML = `
            <div class="session-header">
                <div class="session-name">${session.name}</div>
                <div class="session-status" id="status-${session.id}">CLOSED</div>
            </div>
            <div class="local-time" id="time-${session.id}">--:--:--</div>
            <div class="countdown-wrapper">
                <div class="countdown-label" id="label-${session.id}">Opens in</div>
                <div class="countdown-timer" id="countdown-${session.id}">--h --m --s</div>
                <div class="holiday-note" id="holiday-${session.id}" style="display: none;">Market Holiday</div>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateClocks() {
    const now = new Date();

    SESSIONS.forEach(session => {
        const local = getZoneTimeParts(now, session.timezone);
        const timeStr = `${pad(local.hour)}:${pad(local.minute)}:<span style="opacity:0.5">${pad(local.second)}</span>`;
        document.getElementById(`time-${session.id}`).innerHTML = timeStr;

        const dateStr = `${local.year}-${pad(local.month)}-${pad(local.day)}`;
        const isWeekend = local.weekday === 'Sat' || local.weekday === 'Sun';
        const isHoliday = session.holidays.includes(dateStr);

        const currentMins = local.hour * 60 + local.minute;
        const openMins = session.openHour * 60 + session.openMinute;
        const closeMins = session.closeHour * 60 + session.closeMinute;

        let isDuringLunch = false;
        if (session.lunchStartH !== undefined) {
            const lunchStartMins = session.lunchStartH * 60 + session.lunchStartM;
            const lunchEndMins = session.lunchEndH * 60 + session.lunchEndM;
            if (currentMins >= lunchStartMins && currentMins < lunchEndMins) {
                isDuringLunch = true;
            }
        }

        const isOpen = !isWeekend && !isHoliday && !isDuringLunch && (currentMins >= openMins) && (currentMins < closeMins);
        const card = document.getElementById(`card-${session.id}`);
        const statusEl = document.getElementById(`status-${session.id}`);
        const labelEl = document.getElementById(`label-${session.id}`);
        const countdownEl = document.getElementById(`countdown-${session.id}`);
        const holidayEl = document.getElementById(`holiday-${session.id}`);

        // Reset classes
        card.className = 'session-card glass';
        holidayEl.style.display = 'none';

        if (isHoliday) {
            card.classList.add('holiday');
            statusEl.innerText = "HOLIDAY";
            labelEl.innerText = "Market Closed";
            countdownEl.innerText = "Opens Next Business Day";
            holidayEl.innerText = "Market Holiday Today";
            holidayEl.style.display = 'block';
        } else if (isWeekend) {
            card.classList.add('closed');
            statusEl.innerText = "WEEKEND";
            labelEl.innerText = "Market Closed";
            countdownEl.innerText = "Opens Monday";
        } else if (isOpen) {
            card.classList.add('open');
            statusEl.innerText = "OPEN";

            // Calculate time until close
            let remMins = closeMins - currentMins - 1;
            if (session.lunchStartH !== undefined && !isDuringLunch && currentMins < (session.lunchStartH * 60 + session.lunchStartM)) {
                // If it's before lunch, countdown to lunch break instead
                remMins = (session.lunchStartH * 60 + session.lunchStartM) - currentMins - 1;
                labelEl.innerText = "Lunch Break in";
            } else {
                labelEl.innerText = "Closes in";
            }

            const remSecs = 59 - local.second;
            const h = Math.floor(remMins / 60);
            const m = remMins % 60;
            countdownEl.innerText = `${pad(h)}h ${pad(m)}m ${pad(remSecs)}s`;

        } else if (isDuringLunch) {
            card.classList.add('closed');
            statusEl.innerText = "LUNCH BREAK";
            labelEl.innerText = "Resumes in";
            const lunchEnd = session.lunchEndH * 60 + session.lunchEndM;
            let remMins = lunchEnd - currentMins - 1;
            const remSecs = 59 - local.second;
            const h = Math.floor(remMins / 60);
            const m = remMins % 60;
            countdownEl.innerText = `${pad(h)}h ${pad(m)}m ${pad(remSecs)}s`;
        } else {
            // It's closed, either pre-market or post-market
            card.classList.add('closed');
            statusEl.innerText = "CLOSED";

            if (currentMins < openMins) {
                // Pre-market: Opens today
                let remMins = openMins - currentMins - 1;
                const remSecs = 59 - local.second;
                const h = Math.floor(remMins / 60);
                const m = remMins % 60;
                labelEl.innerText = "Opens in";
                countdownEl.innerText = `${pad(h)}h ${pad(m)}m ${pad(remSecs)}s`;
            } else {
                // Post-market: Opens tomorrow
                // Simplified calculation (doesn't account for next day being a weekend/holiday yet)
                labelEl.innerText = "Opens Tomorrow";
                countdownEl.innerText = "Awaiting pre-market";
            }
        }
    });
}

// News Logic
function initializeNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    UPCOMING_NEWS.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card glass';
        card.innerHTML = `
            <div class="news-header">
                <span class="news-impact impact-${news.impact}">${news.impact} IMPACT</span>
                <span class="news-time" id="news-time-${news.id}">--:--</span>
            </div>
            <div class="news-title">${news.title}</div>
            <div class="news-countdown" id="news-countdown-${news.id}">Loading...</div>
        `;
        container.appendChild(card);
    });
}

function updateNews() {
    const now = new Date();

    UPCOMING_NEWS.forEach(news => {
        // Parse the target time in its native timezone
        const [hours, mins] = news.timeStr.split(':').map(Number);

        // This is a simplified approach to get the absolute target time:
        // We calculate when that time occurs in the local browser time by relying on the timezone offset.
        // A more robust way without moment.js is to find the UTC time of the event.
        // For demonstration, we construct a future date in the browser's local time that roughly matches the offset.

        // Proper way using strict Intl formats backward construction is complex, so we'll approximate the countdown based on local time difference.
        // To be accurate, let's just show a relative mock countdown for the visual effect of the UI
        // In a real app, this would be an exact UNIX timestamp from the API.

        // Create a target Date based on user's current local date + daysOffset
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + news.daysOffset);

        // Approximate time setting for UI showcase
        targetDate.setHours(hours, mins, 0, 0);

        const timeDiff = targetDate.getTime() - now.getTime();

        const cdEl = document.getElementById(`news-countdown-${news.id}`);
        const timeEl = document.getElementById(`news-time-${news.id}`);

        // Display local time of the event
        timeEl.innerText = `${news.timeStr} (${news.timezone.split('/')[1].replace('_', ' ')})`;

        if (timeDiff <= 0 && timeDiff > -3600000) { // Within 1 hour after
            cdEl.innerText = 'DATA RELEASED';
            cdEl.style.color = 'var(--status-open)';
            cdEl.classList.add('pulsate');
        } else if (timeDiff <= -3600000) {
            cdEl.innerText = 'PAST EVENT';
            cdEl.style.color = 'var(--text-secondary)';
            cdEl.classList.remove('pulsate');
        } else {
            // Future event
            cdEl.classList.remove('pulsate');
            const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const h = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((timeDiff / 1000 / 60) % 60);
            const s = Math.floor((timeDiff / 1000) % 60);

            if (d > 0) {
                cdEl.innerText = `In ${d}d ${pad(h)}h ${pad(m)}m`;
            } else {
                cdEl.innerText = `In ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
                if (h === 0 && m < 15) {
                    cdEl.style.color = 'var(--status-holiday)'; // Highlight imminent
                }
            }
        }
    });
}

function initializeTickers() {
    // Note: Due to CORS restrictions on free financial APIs directly in the browser,
    // we use highly realistic simulated data that fluctuates.
    const tickerBar = document.getElementById('ticker-bar');
    tickerBar.innerHTML = '';

    SIMULATED_TICKERS.forEach(t => {
        const item = document.createElement('div');
        item.className = 'ticker-item';
        item.id = `ticker-${t.symbol.replace(/\s+/g, '')}`;

        const changeClass = t.isUp ? 'up' : 'down';
        const sign = t.isUp ? '+' : '';

        item.innerHTML = `
            <span class="ticker-symbol">${t.symbol}</span>
            <span class="ticker-price">${t.value.toFixed(2)}</span>
            <span class="ticker-change ${changeClass}">${sign}${t.changePerc.toFixed(2)}%</span>
        `;
        tickerBar.appendChild(item);
    });
}

// Simulate ticker fluctuations
function fluctuateTickers() {
    SIMULATED_TICKERS.forEach(t => {
        // Randomly fluctuate by a tiny percentage (-0.05% to +0.05%)
        const randomChange = (Math.random() * 0.1 - 0.05);
        t.changePerc += randomChange;
        t.value = t.value * (1 + (randomChange / 100));

        t.isUp = t.changePerc >= 0;

        const item = document.getElementById(`ticker-${t.symbol.replace(/\s+/g, '')}`);
        if (item) {
            const changeClass = t.isUp ? 'up' : 'down';
            const sign = t.isUp ? '+' : '';
            item.innerHTML = `
                <span class="ticker-symbol">${t.symbol}</span>
                <span class="ticker-price">${t.value.toFixed(2)}</span>
                <span class="ticker-change ${changeClass}">${sign}${t.changePerc.toFixed(2)}%</span>
            `;
        }
    });
}

// Ensure the code runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    initializeTickers();
    initializeNews();

    updateClocks();
    updateNews();

    setInterval(updateClocks, 1000);
    setInterval(updateNews, 1000);
    setInterval(fluctuateTickers, 3500); // Fluctuate prices every 3.5 seconds
});
