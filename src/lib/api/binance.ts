// Technical Indicators calculations
export class TechnicalIndicators {
  static calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;
    
    let gains = 0;
    let losses = 0;
    
    // Calculate initial average gain and loss
    for (let i = 1; i <= period; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) {
        gains += change;
      } else {
        losses -= change;
      }
    }
    
    let avgGain = gains / period;
    let avgLoss = losses / period;
    
    // Calculate RSI for the latest period
    for (let i = period + 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? -change : 0;
      
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
  
  static calculateMACD(prices: number[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9) {
    if (prices.length < slowPeriod) {
      return { macd: 0, signal: 0, histogram: 0 };
    }
    
    // Calculate EMAs
    const fastEMA = this.calculateEMA(prices, fastPeriod);
    const slowEMA = this.calculateEMA(prices, slowPeriod);
    
    // MACD line
    const macd = fastEMA - slowEMA;
    
    // Signal line (EMA of MACD)
    const macdValues = [macd]; // Simplified for demo
    const signal = macd * 0.9; // Simplified calculation
    
    // Histogram
    const histogram = macd - signal;
    
    return { macd, signal, histogram };
  }
  
  static calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2) {
    if (prices.length < period) {
      const price = prices[prices.length - 1] || 0;
      return { upper: price * 1.02, middle: price, lower: price * 0.98 };
    }
    
    // Calculate SMA
    const recentPrices = prices.slice(-period);
    const sma = recentPrices.reduce((sum, price) => sum + price, 0) / period;
    
    // Calculate standard deviation
    const variance = recentPrices.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
    const standardDeviation = Math.sqrt(variance);
    
    return {
      upper: sma + (standardDeviation * stdDev),
      middle: sma,
      lower: sma - (standardDeviation * stdDev)
    };
  }
  
  private static calculateEMA(prices: number[], period: number): number {
    if (prices.length === 0) return 0;
    
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    
    for (let i = 1; i < prices.length; i++) {
      ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    
    return ema;
  }
}

// Binance API client (mock for now)
export class BinanceClient {
  private baseUrl = 'https://api.binance.com/api/v3';
  
  async getKlines(symbol: string, interval: string, limit: number = 100) {
    // Mock implementation - replace with real API call
    const mockData = Array.from({ length: limit }, (_, i) => {
      const basePrice = symbol === 'BTCUSDT' ? 43000 : 2500;
      const price = basePrice + Math.sin(i * 0.1) * 1000 + Math.random() * 500;
      return [
        Date.now() - (limit - i) * 60000, // Open time
        price.toString(), // Open
        (price * 1.01).toString(), // High
        (price * 0.99).toString(), // Low
        price.toString(), // Close
        '1000', // Volume
        Date.now() - (limit - i - 1) * 60000, // Close time
        '1000000', // Quote asset volume
        100, // Number of trades
        '500', // Taker buy base asset volume
        '500000', // Taker buy quote asset volume
        '0' // Ignore
      ];
    });
    
    return mockData;
  }
  
  async getTicker24hr(symbol?: string) {
    // Mock implementation
    const symbols = symbol ? [symbol] : ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT'];
    
    return symbols.map(sym => ({
      symbol: sym,
      priceChange: (Math.random() * 2000 - 1000).toString(),
      priceChangePercent: (Math.random() * 10 - 5).toString(),
      weightedAvgPrice: '43000',
      prevClosePrice: '42500',
      lastPrice: (43000 + Math.random() * 1000 - 500).toString(),
      lastQty: '0.1',
      bidPrice: '42950',
      askPrice: '43050',
      openPrice: '42500',
      highPrice: '44000',
      lowPrice: '42000',
      volume: (Math.random() * 100000).toString(),
      quoteVolume: (Math.random() * 1000000000).toString(),
      openTime: Date.now() - 86400000,
      closeTime: Date.now(),
      firstId: 1,
      lastId: 1000,
      count: 1000
    }));
  }
}

