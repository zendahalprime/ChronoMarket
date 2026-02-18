import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Market } from '../data/markets';

type Status = 'OPEN' | 'CLOSED' | 'LUNCH' | 'WEEKEND';

interface MarketState {
  status: Status;
  countdown: string;
  targetLabel: string;
  isOpen: boolean;
}

export const useMarketStatus = (market: Market): MarketState => {
  const [state, setState] = useState<MarketState>({
    status: 'CLOSED',
    countdown: '--:--:--',
    targetLabel: 'Loading...',
    isOpen: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = DateTime.now().setZone(market.zone);
      
      let open = now.set(market.openTime);
      let close = now.set(market.closeTime);
      let lunchStart = market.lunchBreak ? now.set(market.lunchBreak.start) : null;
      let lunchEnd = market.lunchBreak ? now.set(market.lunchBreak.end) : null;

      if (now.weekday >= 6) {
        let nextOpen = open.plus({ days: 8 - now.weekday }); 
        const diff = nextOpen.diff(now);
        setState({
          status: 'WEEKEND',
          countdown: diff.toFormat('hh:mm:ss'),
          targetLabel: 'UNTIL MONDAY OPEN',
          isOpen: false,
        });
        return;
      }

      let targetTime;
      let status: Status;
      let label: string;
      let isOpen = false;

      if (now < open) {
        status = 'CLOSED';
        targetTime = open;
        label = 'UNTIL OPEN';
      } else if (lunchStart && lunchEnd && now >= lunchStart && now < lunchEnd) {
        status = 'LUNCH';
        targetTime = lunchEnd;
        label = 'UNTIL PM SESSION';
        isOpen = false;
      } else if (now >= open && now < close) {
        status = 'OPEN';
        if (lunchStart && now < lunchStart) {
            targetTime = lunchStart;
            label = 'UNTIL LUNCH';
        } else {
            targetTime = close;
            label = 'UNTIL CLOSE';
        }
        isOpen = true;
      } else {
        status = 'CLOSED';
        targetTime = open.plus({ days: 1 });
        if (targetTime.weekday === 6) targetTime = targetTime.plus({ days: 2 });
        label = 'UNTIL OPEN';
      }

      const diff = targetTime.diff(now);
      setState({
        status,
        countdown: diff.toFormat('hh:mm:ss'),
        targetLabel: label,
        isOpen
      });

    }, 1000);
    return () => clearInterval(timer);
  }, [market]);

  return state;
};
