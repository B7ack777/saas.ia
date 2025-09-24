import React from 'react';

interface TradingViewChartProps {
  symbol: string;
  interval: string;
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({ symbol, interval }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-800 rounded-lg">
      <div className="text-center">
        <h3 className="text-white text-xl mb-2">TradingView Chart</h3>
        <p className="text-slate-400">Symbol: {symbol}</p>
        <p className="text-slate-400">Interval: {interval}</p>
        <p className="text-slate-500 text-sm mt-4">
          Chart integration will be implemented with TradingView widgets
        </p>
      </div>
    </div>
  );
};

export default TradingViewChart;

