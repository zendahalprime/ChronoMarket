import { markets } from './data/markets';
import { MarketCard } from './components/MarketCard';
import { Activity } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen p-8 md:p-12 lg:p-20 flex flex-col items-center relative z-10">
      <header className="w-full max-w-7xl flex justify-between items-center mb-16">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyber-blue/10 rounded-lg border border-cyber-blue/50">
            <Activity className="text-cyber-blue" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-widest text-white">
            CHRONO<span className="text-cyber-blue">MARKET</span>
          </h1>
        </div>
        <div className="hidden md:block text-xs text-gray-500 font-mono text-right">
          SYSTEM: ONLINE<br/>
          SYNC: LUXON_V3
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {markets.map((market, index) => (
          <MarketCard key={market.id} market={market} index={index} />
        ))}
      </main>

      <footer className="mt-20 text-gray-600 text-sm font-mono text-center">
        MARKET DATA CALCULATED VIA LOCAL EXCHANGE HOURS
      </footer>
    </div>
  );
}

export default App;
