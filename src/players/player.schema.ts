import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<Player>;

@Schema()
export class Player {
  @Prop({ required: [true, 'Name is required!!!'], trim: true })
  name: string;

  @Prop({ default: 0 })
  goals: number;

  @Prop({ default: 3 })
  average: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
