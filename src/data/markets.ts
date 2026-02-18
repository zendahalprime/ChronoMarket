export interface Market {
  id: string;
  name: string;
  zone: string;
  openTime: { hour: number; minute: number };
  closeTime: { hour: number; minute: number };
  lunchBreak?: {
    start: { hour: number; minute: number };
    end: { hour: number; minute: number };
  };
}

export const markets: Market[] = [
  {
    id: 'nyse',
    name: 'NEW YORK',
    zone: 'America/New_York',
    openTime: { hour: 9, minute: 30 },
    closeTime: { hour: 16, minute: 0 },
  },
  {
    id: 'lse',
    name: 'LONDON',
    zone: 'Europe/London',
    openTime: { hour: 8, minute: 0 },
    closeTime: { hour: 16, minute: 30 },
  },
  {
    id: 'dax',
    name: 'FRANKFURT',
    zone: 'Europe/Berlin',
    openTime: { hour: 9, minute: 0 },
    closeTime: { hour: 17, minute: 30 },
  },
  {
    id: 'tse',
    name: 'TOKYO',
    zone: 'Asia/Tokyo',
    openTime: { hour: 9, minute: 0 },
    closeTime: { hour: 15, minute: 0 },
    lunchBreak: {
      start: { hour: 11, minute: 30 },
      end: { hour: 12, minute: 30 },
    },
  },
  {
    id: 'hkex',
    name: 'HONG KONG',
    zone: 'Asia/Hong_Kong',
    openTime: { hour: 9, minute: 30 },
    closeTime: { hour: 16, minute: 0 },
    lunchBreak: {
      start: { hour: 12, minute: 0 },
      end: { hour: 13, minute: 0 },
    },
  },
];
