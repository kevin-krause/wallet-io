import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyObject, Model } from 'mongoose';
import { CurrencyStream } from './schemas/currency-stream.schema';
import * as WebSocket from 'ws';

@Injectable()
export class MsBinanceService implements OnModuleInit {
  private readonly logger = new Logger(MsBinanceService.name);
  private readonly websockets: Map<string, WebSocket> = new Map();
  private readonly subscriptionCallbacks: Map<
    string,
    Set<(data: any) => void>
  > = new Map();
  private readonly baseUrl = 'wss://stream.binance.com:9443/ws/';

  constructor(
    @InjectModel(CurrencyStream.name)
    private readonly currencyStreamModel: Model<AnyObject>,
  ) {}

  onModuleInit() {
    this.logger.log('Binance WebSocket service initialized');
  }

  subscribeToMarketData(symbol: string, callback: (data: any) => void): void {
    const lowerSymbol = symbol.toLowerCase();

    // Register callback
    if (!this.subscriptionCallbacks.has(lowerSymbol)) {
      this.subscriptionCallbacks.set(lowerSymbol, new Set());
    }
    this.subscriptionCallbacks.get(lowerSymbol)?.add(callback);

    // Check if websocket already exists for this symbol
    if (!this.websockets.has(lowerSymbol)) {
      // Create new WebSocket connection for kline/candlestick data (1m interval)
      const wsEndpoint = `${this.baseUrl}${lowerSymbol}@kline_1m`;
      const ws = new WebSocket(wsEndpoint);

      ws.on('open', () => {
        this.logger.log(`Connected to Binance WebSocket for ${symbol}`);
      });

      ws.on('message', (data: WebSocket.Data) => {
        try {
          const parsedData = JSON.parse(data.toString());

          // Store data in MongoDB if needed
          this.storeCurrencyStream(parsedData);

          // Notify all subscribers
          const callbacks = this.subscriptionCallbacks.get(lowerSymbol);
          if (callbacks) {
            callbacks.forEach((cb) => cb(parsedData));
          }
        } catch (error) {
          this.logger.error(`Error parsing Binance data: ${error.message}`);
        }
      });

      ws.on('error', (error) => {
        this.logger.error(`WebSocket error for ${symbol}: ${error.message}`);
      });

      ws.on('close', () => {
        this.logger.log(`Disconnected from Binance WebSocket for ${symbol}`);
        this.websockets.delete(lowerSymbol);
      });

      this.websockets.set(lowerSymbol, ws);
    }
  }

  subscribeToMarketDataOnce(
    symbol: string,
    callback: (data: any) => void,
  ): void {
    const lowerSymbol = symbol.toLowerCase();

    // Create a one-time WebSocket connection
    const wsEndpoint = `${this.baseUrl}${lowerSymbol}@kline_1m`;
    const ws = new WebSocket(wsEndpoint);

    ws.on('open', () => {
      this.logger.log(
        `Connected to Binance WebSocket for one-time data: ${symbol}`,
      );
    });

    ws.on('message', (data: WebSocket.Data) => {
      try {
        const parsedData = JSON.parse(data.toString());

        // Send data to the callback
        callback(parsedData);

        // Close the connection after receiving data
        ws.close();
      } catch (error) {
        this.logger.error(`Error parsing Binance data: ${error.message}`);
        ws.close();
      }
    });

    ws.on('error', (error) => {
      this.logger.error(`WebSocket error for ${symbol}: ${error.message}`);
      ws.close();
    });
  }

  unsubscribeFromMarketData(symbol: string): void {
    const lowerSymbol = symbol.toLowerCase();

    // Close WebSocket if it exists
    if (this.websockets.has(lowerSymbol)) {
      const ws = this.websockets.get(lowerSymbol);
      ws.close();
      this.websockets.delete(lowerSymbol);
      this.subscriptionCallbacks.delete(lowerSymbol);
      this.logger.log(`Unsubscribed from ${symbol} market data`);
    }
  }

  private async storeCurrencyStream(data: any): Promise<void> {
    try {
      // Create a new document from the received data
      const createdStream = new this.currencyStreamModel(data);
      await createdStream.save();
    } catch (error) {
      this.logger.error(`Error storing currency stream data: ${error.message}`);
    }
  }

  // Keep existing methods
  async createCurrencyStream(
    currencyStream: Partial<AnyObject>,
  ): Promise<AnyObject> {
    const createdCurrencyStream = new this.currencyStreamModel(currencyStream);
    // return createdCurrencyStream.save();
    return createdCurrencyStream;
  }

  async findAllCurrencyStreams(): Promise<AnyObject[]> {
    return this.currencyStreamModel.find().exec();
  }

  async findCurrencyStreamById(id: string): Promise<AnyObject | null> {
    return this.currencyStreamModel.findById(id).exec();
  }
}
