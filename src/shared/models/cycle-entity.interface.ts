import { ICandle } from './candle-entity.interface';
import { CycleType } from './cycle-types.enum';

//export wave interface from wave class
export interface ICycle {
  id: string;
  type: CycleType;
  candles: ICandle[];
  createdAt: Date;
  updatedAt: Date;
  startDateTime: Date | null;
  endDateTime: Date | null;
  interval: string;
  symbol: string;
  shadow: number;
  corpse: number;

  addCandle(newCandle: ICandle): boolean;
  setType(type: CycleType): void;
  getType(): CycleType;
  getStartDateTime(): Date | null;
  getEndDateTime(): Date | null;
  getDuration(): number;
  getNumberOfCandles(): number;
  getCandles(): ICandle[];
  getLastCandle(): ICandle;
}
