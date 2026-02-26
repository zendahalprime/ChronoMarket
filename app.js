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
        id: 'in',
        name: 'Mumbai (IN)',
        timezone: 'Asia/Kolkata',
        openHour: 9, openMinute: 15,
        closeHour: 15, closeMinute: 30,
        holidays: ['2026-01-26', '2026-03-03', '2026-03-20', '2026-04-03', '2026-04-14', '2026-05-01', '2026-08-15', '2026-10-02', '2026-11-08', '2026-12-25'],
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

const FINNHUB_API_KEY = 'd6gcu39r01qt4932f0t0d6gcu39r01qt4932f0tg';
const TICKERS = [
    { symbol: 'SPY', idx: 'S&P 500 ETF' },
    { symbol: 'QQQ', idx: 'NASDAQ ETF' },
    { symbol: 'DIA', idx: 'DOW ETF' },
    { symbol: 'VGK', idx: 'EUROPE ETF' },
    { symbol: 'EWJ', idx: 'JAPAN ETF' },
    { symbol: 'MCHI', idx: 'CHINA ETF' },
    { symbol: 'INDA', idx: 'INDIA ETF' }
];

let LIVE_TICKERS = [];
let LIVE_NEWS = [];
let chartInstance = null;
let lineSeries = null;

// Settings
let settings = {
    audioEnabled: true
};

function loadSettings() {
    const saved = localStorage.getItem('chronoSettings');
    if (saved) {
        settings = JSON.parse(saved);
    }
    const audioToggle = document.getElementById('toggle-audio');
    if (audioToggle) audioToggle.checked = settings.audioEnabled;
}

function saveSettings() {
    localStorage.setItem('chronoSettings', JSON.stringify(settings));
}

console.log('ChronoMarket Logic Loading - Pro Terminal Mode');

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

    let openMarketsCount = 0;

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
            openMarketsCount++;
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

            // Audio Alert: 5 minutes to open
            if (statusEl.innerText !== "HOLIDAY" && nextOpenTs - nowMs > 0 && nextOpenTs - nowMs <= 300000 && nextOpenTs - nowMs > 299000) {
                playAudio('audio-ding');
            }
            renderCountdown(nowMs, nextOpenTs, countdownEl);
        }
    });

    // Overlap Indicator Logic
    const overlapEl = document.getElementById('overlap-indicator');
    if (overlapEl) {
        if (openMarketsCount >= 3) {
            overlapEl.innerText = "Session Overlap: EXTREME";
            overlapEl.className = "overlap-indicator extreme";
        } else if (openMarketsCount === 2) {
            overlapEl.innerText = "Session Overlap: HIGH";
            overlapEl.className = "overlap-indicator high";
        } else if (openMarketsCount === 1) {
            overlapEl.innerText = "Session Overlap: NORMAL";
            overlapEl.className = "overlap-indicator normal";
        } else {
            overlapEl.innerText = "Session Overlap: LOW (PRE-MARKET)";
            overlapEl.className = "overlap-indicator";
        }
    }
}

function playAudio(id) {
    if (!settings.audioEnabled) return;
    const a = document.getElementById(id);
    if (a) {
        a.currentTime = 0;
        a.play().catch(e => console.log('Audio blocked by browser policy until user interacts.'));
    }
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
async function fetchEconomicCalendar() {
    const container = document.getElementById('news-container');
    container.innerHTML = '<div class="news-countdown">Fetching live economic data...</div>';

    try {
        // Fetch real, live ForexFactory calendar data directly via nfs.faireconomy.media
        const targetUrl = `https://nfs.faireconomy.media/ff_calendar_thisweek.json`;

        // Use multiple CORS proxies as fallbacks in case of 429 rate limiting
        const proxies = [
            `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
            `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
            `https://thingproxy.freeboard.io/fetch/${targetUrl}`
        ];

        let response = null;
        for (const proxy of proxies) {
            try {
                const res = await fetch(proxy);
                if (res.ok) {
                    response = res;
                    break;
                }
            } catch (e) { /* ignore and try next */ }
        }

        if (!response || !response.ok) throw new Error('Failed to fetch calendar from all proxies');

        const events = await response.json();
        const nowMs = new Date().getTime();

        // Filter for high/medium impact, currently relevant (not older than 1 day), sort by time
        LIVE_NEWS = events
            .filter(e => e.impact === 'High' || e.impact === 'Medium' || e.impact === 'high' || e.impact === 'medium')
            .filter(e => {
                // Ensure the event isn't too old (keep events from the last 24 hours to 7 days ahead)
                const eventTime = new Date(e.date).getTime();
                return eventTime > nowMs - (24 * 60 * 60 * 1000);
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 10); // Display top 10

        initializeNewsUI();
        updateNews(); // Initial calculation

    } catch (err) {
        console.error('Economic API Error:', err);
        container.innerHTML = '<div class="news-countdown impact-high-text">Live API Connection Failed. Please disable AdBlockers or CORS extensions, or check network.</div>';
    }
}

// Helper to construct a plausible future ISO date string for the fallback mock data
function getIsoDateOffset(daysOffset, hours, minutes) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    d.setHours(hours, minutes, 0, 0);
    // Return precisely formatted string without the Z to simulate the Finnhub format processing expectation
    return d.toISOString().split('.')[0].replace('T', ' ');
}

function initializeNewsUI() {
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    if (LIVE_NEWS.length === 0) {
        container.innerHTML = '<div class="news-countdown">No high-impact news upcoming.</div>';
        return;
    }

    LIVE_NEWS.forEach((news, idx) => {
        const card = document.createElement('div');
        card.className = 'news-card glass';
        const impactLower = (news.impact || 'low').toLowerCase();

        let folderIcon = '';
        if (impactLower === 'high') {
            folderIcon = `<svg class="folder-icon red" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
        } else if (impactLower === 'medium') {
            folderIcon = `<svg class="folder-icon yellow" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
        } else {
            folderIcon = `<svg class="folder-icon green" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`;
        }

        const currency = news.country;

        card.innerHTML = `
            <div class="news-header">
                <div class="news-meta">
                    ${folderIcon}
                    <span class="news-currency currency-${currency}">${currency}</span>
                </div>
                <span class="news-time" id="news-time-${idx}">--:--</span>
            </div>
            <div class="news-title">${news.title}</div>
            <div class="news-countdown" id="news-countdown-${idx}">CALCULATING...</div>
        `;
        container.appendChild(card);
    });
}

function updateNews() {
    const now = new Date();

    LIVE_NEWS.forEach((news, idx) => {
        // The ForexFactory JSON gives dates like "2023-11-03T08:30:00-04:00" which parse natively
        const targetDate = new Date(news.date);
        const timeDiff = targetDate.getTime() - now.getTime();

        const cdEl = document.getElementById(`news-countdown-${idx}`);
        const timeEl = document.getElementById(`news-time-${idx}`);

        if (!cdEl || !timeEl) return;

        // Display local browser time of the event
        const localFormatter = new Intl.DateTimeFormat('default', { hour: '2-digit', minute: '2-digit', hour12: false });
        timeEl.innerText = `${localFormatter.format(targetDate)} (Local)`;

        if (timeDiff <= 0 && timeDiff > -3600000) {
            // Data just released! Show actual vs estimate if available
            const act = (news.actual && news.actual !== '') ? `ACTUAL: ${news.actual}` : 'DATA RELEASED';
            cdEl.innerText = act;
            cdEl.className = 'news-countdown pulsate impact-high-text';

            // Audio Alert: Play exact moment it drops
            if (timeDiff > -1000) {
                playAudio('audio-drop');
                if (news.impact.toLowerCase() === 'high') {
                    document.body.classList.add('flash-red');
                    setTimeout(() => document.body.classList.remove('flash-red'), 1000);
                }
            }
        } else if (timeDiff <= -3600000) {
            cdEl.innerText = (news.actual && news.actual !== '') ? `ACT: ${news.actual} | EST: ${news.forecast}` : 'PAST EVENT';
            cdEl.className = 'news-countdown past';
        } else {
            cdEl.className = 'news-countdown';
            const d = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const h = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((timeDiff / 1000 / 60) % 60);
            const s = Math.floor((timeDiff / 1000) % 60);

            if (d > 0) {
                cdEl.innerText = `T-${d}d ${pad(h)}h ${pad(m)}m`;
            } else {
                cdEl.innerText = `T-${pad(h)}h ${pad(m)}m ${pad(s)}s`;
                if (h === 0 && m < 15) {
                    cdEl.classList.add('impact-high-text', 'pulsate');
                }
            }
        }
    });
}

// Live Ticker Logic
async function fetchTickers() {
    const tickerBar = document.getElementById('ticker-bar');

    if (LIVE_TICKERS.length === 0) {
        tickerBar.innerHTML = '<span class="ticker-loading">CONNECTING TO MARKETS...</span>';
    }

    try {
        const promises = TICKERS.map(async t => {
            const url = `https://finnhub.io/api/v1/quote?symbol=${t.symbol}&token=${FINNHUB_API_KEY}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Rate limit');
            const data = await res.json();
            return {
                symbol: t.idx,
                idx: t.symbol,
                value: data.c, // current price
                changePerc: data.dp, // percent change
                isUp: data.dp >= 0
            };
        });

        LIVE_TICKERS = await Promise.all(promises);
        renderTickers();
    } catch (err) {
        console.error('Ticker API Error:', err);
        if (LIVE_TICKERS.length === 0) {
            tickerBar.innerHTML = '<span class="ticker-loading impact-high-text">LIVE FEED UNAVAILABLE</span>';
        }
    }
}

function renderTickers() {
    const tickerBar = document.getElementById('ticker-bar');
    tickerBar.innerHTML = '';

    LIVE_TICKERS.forEach(t => {
        // Handle API returning null for some markets that are heavily restricted
        if (t.value === null || t.value === 0 || t.value === undefined) return;

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

        // TradingView Integration (Click to open chart)
        item.addEventListener('click', () => openChart(t.symbol, t.idx));

        tickerBar.appendChild(item);
    });
}

// TradingView Chart Logic
function openChart(titleName, symbol) {
    document.getElementById('chart-title').innerText = titleName + ' Intraday Status';
    document.getElementById('chart-overlay').classList.remove('hidden');

    const chartContainer = document.getElementById('tv-chart');
    if (!chartInstance) {
        chartInstance = LightweightCharts.createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: 400,
            layout: {
                background: { color: '#000000' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#2B2B43' },
                horzLines: { color: '#2B2B43' },
            },
            timeScale: { timeVisible: true, secondsVisible: false },
            rightPriceScale: {
                borderVisible: false,
            },
        });
        lineSeries = chartInstance.addLineSeries({
            color: '#00ff73',
            lineWidth: 2,
            crosshairMarkerVisible: true,
            lastValueVisible: true,
            priceLineVisible: true,
        });

        window.addEventListener('resize', () => {
            if (chartContainer) chartInstance.resize(chartContainer.clientWidth, 400);
        });
    }

    // Reset Data visually during fetch
    if (lineSeries) lineSeries.setData([]);

    // Fetch historical data for line chart (Finnhub candle endpoint - last 2 days)
    const to = Math.floor(Date.now() / 1000);
    const from = to - (2 * 24 * 60 * 60);
    fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=15&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.s === 'ok' && data.t && data.c) {
                const chartData = data.t.map((time, index) => ({
                    time: time,
                    value: data.c[index]
                }));
                lineSeries.setData(chartData);
                chartInstance.timeScale().fitContent();
            } else {
                console.error('No chart data found for', symbol);
            }
        })
        .catch(err => console.error('Chart API Error', err));
}

// Ensure the code runs after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initializeUI();

    // Settings Toggle logic
    document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('settings-panel').classList.toggle('hidden');
    });

    // Audio Toggle Logic
    const toggleAudio = document.getElementById('toggle-audio');
    if (toggleAudio) {
        toggleAudio.addEventListener('change', (e) => {
            settings.audioEnabled = e.target.checked;
            saveSettings();
        });
    }

    // Chart Close Logic
    const closeChartBtn = document.getElementById('close-chart');
    if (closeChartBtn) {
        closeChartBtn.addEventListener('click', () => {
            document.getElementById('chart-overlay').classList.add('hidden');
        });
    }

    // Initial fetches
    fetchEconomicCalendar(); // Live News
    fetchTickers();          // Live Quotes

    // Logic that ticks every second locally
    updateClocks();
    setInterval(updateClocks, 1000);
    setInterval(updateNews, 1000);

    // Rate limited API polling
    setInterval(fetchTickers, 15000);
    setInterval(fetchEconomicCalendar, 3600000);
});
