import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CurrencyStreamDocument = HydratedDocument<CurrencyStream>;

@Schema()
export class CurrencyStream {
  @Prop()
  e: string;

  @Prop()
  E: string;

  @Prop()
  k: string;

  @Prop()
  t: string;

  @Prop()
  T: string;

  @Prop()
  s: string;

  @Prop()
  i: string;

  @Prop()
  f: string;

  @Prop()
  L: string;

  @Prop()
  o: string;

  @Prop()
  c: string;

  @Prop()
  h: string;

  @Prop()
  l: string;

  @Prop()
  v: string;

  @Prop()
  n: string;

  @Prop()
  x: string;

  @Prop()
  q: string;

  @Prop()
  V: string;

  @Prop()
  Q: string;

  @Prop()
  B: string;
}

export const CurrencyStreamSchema =
  SchemaFactory.createForClass(CurrencyStream);
