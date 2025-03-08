import { ICycle } from './cycle-entity.interface';

export enum CandleColor {
  Green,
  Red,
}

export interface ICandle {
  id: string;
  openTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: Date;
  quoteAssetVolume: number;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
  ignore: number;
  completed: boolean;
  cycle: ICycle;
  color: CandleColor;
  maximumCorpse: number;
  minimumCorpse: number;

  initialize(data?: {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: string;
    takerBuyQuoteAssetVolume: string;
    ignore: number;
    completed: boolean;
  }): void;
}
