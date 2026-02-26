const SESSIONS = [
    {
        id: 'us',
        name: 'New York (US)',
        timezone: 'America/New_York',
        openHour: 9, openMinute: 30,
        closeHour: 16, closeMinute: 0,
        holidays: ['2026-01-01', '2026-01-19', '2026-02-16', '2026-04-03', '2026-05-25', '2026-06-19', '2026-07-03', '2026-09-07', '2026-11-26', '2026-12-25'],
        workdays: [1, 2, 3, 4, 5] // Mon-Fri
    },
    {
        id: 'uk',
        name: 'London (UK)',
        timezone: 'Europe/London',
        openHour: 8, openMinute: 0,
        closeHour: 16, closeMinute: 30,
        holidays: ['2026-01-01', '2026-04-03', '2026-04-06', '2026-05-04', '2026-05-25', '2026-08-31', '2026-12-25', '2026-12-28'],
        workdays: [1, 2, 3, 4, 5]
    },
    {
        id: 'eu',
        name: 'Frankfurt (EU)',
        timezone: 'Europe/Berlin',
        openHour: 9, openMinute: 0,
        closeHour: 17, closeMinute: 30,
        holidays: ['2026-01-01', '2026-04-03', '2026-04-06', '2026-05-01', '2026-05-14', '2026-05-25', '2026-12-25', '2026-12-26'],
        workdays: [1, 2, 3, 4, 5]
    },
    {
        id: 'jp',
        name: 'Tokyo (JP)',
        timezone: 'Asia/Tokyo',
        openHour: 9, openMinute: 0,
        closeHour: 15, closeMinute: 0,
        lunchStartH: 11, lunchStartM: 30,
        lunchEndH: 12, lunchEndM: 30,
        holidays: ['2026-01-01', '2026-01-02', '2026-01-12', '2026-02-11', '2026-02-23', '2026-03-20', '2026-04-29', '2026-05-04', '2026-05-05', '2026-05-06', '2026-07-20', '2026-08-11', '2026-09-21', '2026-09-22', '2026-09-23', '2026-10-12', '2026-11-03', '2026-11-23', '2026-12-31'],
        workdays: [1, 2, 3, 4, 5]
    },
    {
        id: 'cn',
        name: 'Shanghai (CN)',
        timezone: 'Asia/Shanghai',
        openHour: 9, openMinute: 30,
        closeHour: 15, closeMinute: 0,
        lunchStartH: 11, lunchStartM: 30,
        lunchEndH: 13, lunchEndM: 0,
        holidays: ['2026-01-01', '2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20', '2026-04-06', '2026-05-01', '2026-05-04', '2026-05-05', '2026-06-19', '2026-09-25', '2026-10-01', '2026-10-02', '2026-10-05', '2026-10-06', '2026-10-07'],
        workdays: [1, 2, 3, 4, 5]
    },
    {
        id: 'hk',
        name: 'Hong Kong (HK)',
        timezone: 'Asia/Hong_Kong',
        openHour: 9, openMinute: 30,
        closeHour: 16, closeMinute: 0,
        lunchStartH: 12, lunchStartM: 0,
        lunchEndH: 13, lunchEndM: 0,
        holidays: ['2026-01-01', '2026-02-17', '2026-02-18', '2026-02-19', '2026-04-03', '2026-04-04', '2026-04-06', '2026-04-07', '2026-05-01', '2026-05-25', '2026-06-19', '2026-07-01', '2026-09-26', '2026-10-01', '2026-10-26', '2026-12-25', '2026-12-26'],
        workdays: [1, 2, 3, 4, 5]
    },
    {
        id: 'au',
        name: 'Sydney (AU)',
        timezone: 'Australia/Sydney',
        openHour: 10, openMinute: 0,
        closeHour: 16, closeMinute: 0,
        holidays: ['2026-01-01', '2026-01-26', '2026-04-03', '2026-04-06', '2026-04-25', '2026-06-08', '2026-12-25', '2026-12-28'],
        workdays: [1, 2, 3, 4, 5]
    },
    {
        id: 'dubai',
        name: 'Dubai (DFM)',
        timezone: 'Asia/Dubai',
        openHour: 10, openMinute: 0,
        closeHour: 15, closeMinute: 0,
        // Dubai market shifted to Mon-Fri in 2022
        holidays: ['2026-01-01', '2026-03-19', '2026-03-20', '2026-05-26', '2026-05-27', '2026-05-28', '2026-06-16', '2026-08-16', '2026-09-15', '2026-12-01', '2026-12-02'],
        workdays: [1, 2, 3, 4, 5]
    }
];

const SIMULATED_TICKERS = [
    { symbol: 'S&P 500', idx: 'SPX', value: 5123.45, changePerc: 0.85, isUp: true },
    { symbol: 'NASDAQ', idx: 'IXIC', value: 16234.10, changePerc: 1.12, isUp: true },
    { symbol: 'FTSE 100', idx: 'UKX', value: 7654.30, changePerc: -0.42, isUp: false },
    { symbol: 'DAX', idx: 'GER40', value: 17890.25, changePerc: 0.25, isUp: true },
    { symbol: 'NIKKEI', idx: 'N225', value: 39500.00, changePerc: -1.05, isUp: false },
    { symbol: 'CSI 300', idx: '000300.SS', value: 3540.10, changePerc: 0.35, isUp: true },
    { symbol: 'HANG SENG', idx: 'HSI', value: 16250.70, changePerc: -1.50, isUp: false },
    { symbol: 'DFMGI', idx: 'DFM', value: 4250.80, changePerc: 0.10, isUp: true },
    { symbol: 'ASX 200', idx: 'AXJO', value: 7750.80, changePerc: 0.15, isUp: true }
];

const UPCOMING_NEWS = [
    { id: 'news1', title: 'Non-Farm Employment Change', currency: 'USD', impact: 'high', timeStr: '08:30', timezone: 'America/New_York', daysOffset: 0 },
    { id: 'news2', title: 'Main Refinancing Rate', currency: 'EUR', impact: 'high', timeStr: '13:15', timezone: 'Europe/Berlin', daysOffset: 0 },
    { id: 'news3', title: 'GDP m/m', currency: 'GBP', impact: 'medium', timeStr: '07:00', timezone: 'Europe/London', daysOffset: 1 },
    { id: 'news4', title: 'Fed Chair Powell Speaks', currency: 'USD', impact: 'high', timeStr: '10:00', timezone: 'America/New_York', daysOffset: 1 },
    { id: 'news5', title: 'Caixin Services PMI', currency: 'CNY', impact: 'low', timeStr: '09:45', timezone: 'Asia/Shanghai', daysOffset: 2 },
    { id: 'news6', title: 'BOJ Core CPI y/y', currency: 'JPY', impact: 'medium', timeStr: '14:00', timezone: 'Asia/Tokyo', daysOffset: 2 }
];

console.log('ChronoMarket Logic Loading - Advanced TradFi Mode');

// --- Advanced Time Helpers ---

// Converts a local Date object into its constituent parts in a specific timezone
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

    let h = parseInt(result.hour, 10);
    if (h === 24) h = 0; // handle midnight

    const weekdayMap = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };

    return {
        year: parseInt(result.year, 10),
        month: parseInt(result.month, 10),
        day: parseInt(result.day, 10),
        hour: h,
        minute: parseInt(result.minute, 10),
        second: parseInt(result.second, 10),
        weekday: weekdayMap[result.weekday]
    };
}

// Check if a given date string (YYYY-MM-DD) is a holiday or a weekend
function isNonTradingDay(year, month, day, weekday, session) {
    const dateStr = `${year}-${pad(month)}-${pad(day)}`;
    const isHoliday = session.holidays.includes(dateStr);
    const isWorkday = session.workdays.includes(weekday);
    return isHoliday || !isWorkday;
}

// Get the UNIX timestamp of a specific hour:minute on a specific date in a specific timezone.
// Since JS doesn't have native "create date in timezone" easily without moment-timezone,
// we approximate by searching for the UTC timestamp that yields the correct time in the target timezone.
function getTimestampForZoneTime(targetYear, targetMonth, targetDay, targetHour, targetMinute, tz) {
    // Start with a UTC guess
    const guessDate = new Date(Date.UTC(targetYear, targetMonth - 1, targetDay, targetHour, targetMinute, 0));

    // Check what the parsed time is in the target timezone
    let parts = getZoneTimeParts(guessDate, tz);

    // Iteratively adjust (max a few loops)
    for (let i = 0; i < 5; i++) {
        const diffHours = targetHour - parts.hour;
        const diffMins = targetMinute - parts.minute;
        // Also handle cross-day diffs roughly
        let dayDiff = targetDay - parts.day;
        if (Math.abs(dayDiff) > 10) { dayDiff = dayDiff > 0 ? -1 : 1; } // cross month

        const totalDiffMins = (dayDiff * 24 * 60) + (diffHours * 60) + diffMins;

        if (totalDiffMins === 0) break;
        guessDate.setUTCMinutes(guessDate.getUTCMinutes() + totalDiffMins);
        parts = getZoneTimeParts(guessDate, tz);
    }
    return guessDate.getTime();
}

// Find the precise timestamp of the next market open for a given session from a current time.
function findNextOpenTimestamp(nowMs, session) {
    let checkDate = new Date(nowMs);

    for (let dayOffset = 0; dayOffset < 30; dayOffset++) { // Search up to 30 days ahead
        const dateToCheckDate = new Date(nowMs + (dayOffset * 24 * 60 * 60 * 1000));
        const parts = getZoneTimeParts(dateToCheckDate, session.timezone);

        if (isNonTradingDay(parts.year, parts.month, parts.day, parts.weekday, session)) {
            continue; // Skip holidays and weekends entirely
        }

        const openTs = getTimestampForZoneTime(parts.year, parts.month, parts.day, session.openHour, session.openMinute, session.timezone);

        // If today is a trading day but the open time has already passed, only return it if we are checking today AND it's a future time (pre-market).
        // If we are currently midway through the session, the next open is tomorrow.
        if (openTs > nowMs) {
            return openTs;
        }
    }
    return 0; // fallback error
}

// Find the precise timestamp of the next market close (or lunch break start)
function findNextCloseTimestamp(nowMs, session) {
    const parts = getZoneTimeParts(new Date(nowMs), session.timezone);

    // First, check if we are heading to lunch
    if (session.lunchStartH !== undefined) {
        const lunchStartTs = getTimestampForZoneTime(parts.year, parts.month, parts.day, session.lunchStartH, session.lunchStartM, session.timezone);
        if (lunchStartTs > nowMs) {
            return { ts: lunchStartTs, type: 'lunch' };
        }
    }

    // Otherwise heading to close
    const closeTs = getTimestampForZoneTime(parts.year, parts.month, parts.day, session.closeHour, session.closeMinute, session.timezone);
    return { ts: closeTs, type: 'close' };
}

// Find the precise timestamp of the next resume from lunch
function findNextResumeTimestamp(nowMs, session) {
    if (session.lunchStartH === undefined) return 0;
    const parts = getZoneTimeParts(new Date(nowMs), session.timezone);
    return getTimestampForZoneTime(parts.year, parts.month, parts.day, session.lunchEndH, session.lunchEndM, session.timezone);
}

function pad(n) { return n < 10 ? '0' + n : n; }

// --- UI Logic ---

function initializeUI() {
    const container = document.getElementById('clocks-container');
    container.innerHTML = '';
    SESSIONS.forEach(session => {
        const card = document.createElement('div');
        card.className = 'session-card glass locked';
        card.id = `card-${session.id}`;

        card.innerHTML = `
            <div class="session-header">
                <div class="session-name">${session.name}</div>
                <div class="session-status" id="status-${session.id}">...</div>
            </div>
            <div class="local-time" id="time-${session.id}">--:--:--</div>
            <div class="countdown-wrapper">
                <div class="countdown-label" id="label-${session.id}">CALCULATING</div>
                <div class="countdown-timer" id="countdown-${session.id}">--h --m --s</div>
                <div class="holiday-note" id="holiday-${session.id}" style="display: none;"></div>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateClocks() {
    const now = new Date();
    const nowMs = now.getTime();

    SESSIONS.forEach(session => {
        const local = getZoneTimeParts(now, session.timezone);
        const timeStr = `${pad(local.hour)}:${pad(local.minute)}:<span class="sec">${pad(local.second)}</span>`;
        document.getElementById(`time-${session.id}`).innerHTML = timeStr;

        const isClosedDay = isNonTradingDay(local.year, local.month, local.day, local.weekday, session);
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

        const isOpenToday = !isClosedDay && (currentMins >= openMins) && (currentMins < closeMins);
        const isOpen = isOpenToday && !isDuringLunch;

        const card = document.getElementById(`card-${session.id}`);
        const statusEl = document.getElementById(`status-${session.id}`);
        const labelEl = document.getElementById(`label-${session.id}`);
        const countdownEl = document.getElementById(`countdown-${session.id}`);
        const holidayEl = document.getElementById(`holiday-${session.id}`);

        // Reset base classes
        card.className = 'session-card glass';
        holidayEl.style.display = 'none';

        if (isOpen) {
            // Market is currently OPEN. Countdown to close or lunch.
            card.classList.add('open');
            statusEl.innerText = "ACTIVE";

            const nextTarget = findNextCloseTimestamp(nowMs, session);
            if (nextTarget.type === 'lunch') {
                labelEl.innerText = "LUNCH BREAK IN";
            } else {
                labelEl.innerText = "CLOSES IN";
            }

            renderCountdown(nowMs, nextTarget.ts, countdownEl);

        } else if (isOpenToday && isDuringLunch) {
            // Market is on LUNCH BREAK. Countdown to resume.
            card.classList.add('closed');
            statusEl.innerText = "LUNCH BREAK";
            labelEl.innerText = "RESUMES IN";

            const nextTs = findNextResumeTimestamp(nowMs, session);
            renderCountdown(nowMs, nextTs, countdownEl);

        } else {
            // Market is CLOSED (Pre-market, Post-market, Weekend, or Holiday). Countdown to next open.
            card.classList.add('closed');
            statusEl.innerText = isClosedDay ? (session.holidays.includes(`${local.year}-${pad(local.month)}-${pad(local.day)}`) ? "HOLIDAY" : "WEEKEND") : "CLOSED";

            if (statusEl.innerText === "HOLIDAY") {
                holidayEl.innerText = "MARKET HOLIDAY OBSERVED";
                holidayEl.style.display = 'block';
            }

            labelEl.innerText = "OPENS IN";

            const nextOpenTs = findNextOpenTimestamp(nowMs, session);
            renderCountdown(nowMs, nextOpenTs, countdownEl);
        }
    });
}

function renderCountdown(nowMs, targetMs, el) {
    if (!targetMs || targetMs <= nowMs) {
        el.innerText = "00h 00m 00s";
        return;
    }

    const diff = targetMs - nowMs;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (d > 0) {
        el.innerText = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    } else {
        el.innerText = `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
    }
}

// News Logic
function initializeNews() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    UPCOMING_NEWS.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card glass';

        let folderIcon = '';
        if (news.impact === 'high') {
            folderIcon = `<svg class="folder-icon red" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
        } else if (news.impact === 'medium') {
            folderIcon = `<svg class="folder-icon yellow" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
        } else {
            folderIcon = `<svg class="folder-icon green" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
        }

        card.innerHTML = `
            <div class="news-header">
                <div class="news-meta">
                    ${folderIcon}
                    <span class="news-currency currency-${news.currency}">${news.currency}</span>
                </div>
                <span class="news-time" id="news-time-${news.id}">--:--</span>
            </div>
            <div class="news-title">${news.title}</div>
            <div class="news-countdown" id="news-countdown-${news.id}">CALCULATING...</div>
        `;
        container.appendChild(card);
    });
}

function updateNews() {
    const now = new Date();

    UPCOMING_NEWS.forEach(news => {
        // Parse the target time in its native timezone
        const [hours, mins] = news.timeStr.split(':').map(Number);

        // Use the same targetDate approximation logic for the news as before, but with updated currency styling.
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + news.daysOffset);
        targetDate.setHours(hours, mins, 0, 0);

        const timeDiff = targetDate.getTime() - now.getTime();

        const cdEl = document.getElementById(`news-countdown-${news.id}`);
        const timeEl = document.getElementById(`news-time-${news.id}`);

        // Display local time of the event
        timeEl.innerText = `${news.timeStr} (${news.timezone.split('/')[1].replace('_', ' ')})`;

        if (timeDiff <= 0 && timeDiff > -3600000) {
            cdEl.innerText = 'DATA RELEASED';
            cdEl.className = 'news-countdown pulsate impact-high-text';
        } else if (timeDiff <= -3600000) {
            cdEl.innerText = 'PAST EVENT';
            cdEl.className = 'news-countdown past';
        } else {
            cdEl.className = 'news-countdown';
            const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const h = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((timeDiff / 1000 / 60) % 60);
            const s = Math.floor((timeDiff / 1000) % 60);

            if (d > 0) {
                cdEl.innerText = `LOCKED - T-${d}d ${pad(h)}h ${pad(m)}m`;
            } else {
                cdEl.innerText = `LOCKED - T-${pad(h)}h ${pad(m)}m ${pad(s)}s`;
                if (h === 0 && m < 15) {
                    cdEl.classList.add('impact-high-text', 'pulsate');
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
            <span class="ticker-idx">[${t.idx}]</span>
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
                <span class="ticker-idx">[${t.idx}]</span>
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
