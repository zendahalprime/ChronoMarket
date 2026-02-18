import React from 'react';
import { motion } from 'framer-motion';
import { Market } from '../data/markets';
import { useMarketStatus } from '../hooks/useMarketStatus';
import { Clock, Globe } from 'lucide-react';
import { DateTime } from 'luxon';

interface Props {
  market: Market;
  index: number;
}

export const MarketCard: React.FC<Props> = ({ market, index }) => {
  const { status, countdown, targetLabel, isOpen } = useMarketStatus(market);
  
  const isGreen = isOpen;
  const colorClass = isGreen ? 'text-cyber-green border-cyber-green/30' : 'text-cyber-red border-cyber-red/30';
  const glowClass = isGreen ? 'shadow-[0_0_30px_rgba(0,255,157,0.15)]' : 'shadow-[0_0_15px_rgba(255,0,85,0.05)]';
  const localTime = DateTime.now().setZone(market.zone).toFormat('HH:mm');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl bg-cyber-glass backdrop-blur-xl border ${colorClass} p-6 flex flex-col justify-between h-64 ${glowClass} transition-colors duration-700`}
    >
      <div className="flex justify-between items-start z-10">
        <div>
          <h2 className="text-2xl font-black tracking-wider text-white">{market.name}</h2>
          <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
            <Globe size={12} />
            <span>{market.zone}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${isGreen ? 'bg-cyber-green/10 border-cyber-green text-cyber-green' : 'bg-cyber-red/10 border-cyber-red text-cyber-red'}`}>
          {status}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center z-10 my-4">
        <div className={`text-5xl lg:text-6xl font-mono font-bold tracking-tighter ${isGreen ? 'text-cyber-green' : 'text-cyber-red'}`}>
          {countdown}
        </div>
        <div className="text-xs tracking-[0.2em] text-gray-400 mt-2 uppercase">
          {targetLabel}
        </div>
      </div>

      <div className="flex justify-between items-end z-10 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 text-gray-300">
           <Clock size={16} />
           <span className="font-mono text-sm">{localTime}</span>
        </div>
        <div className="text-[10px] text-gray-500 uppercase">Local Time</div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] -z-0 pointer-events-none" />
    </motion.div>
  );
};
