import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Player } from 'src/players/player.schema';

export type TeamDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ required: [true, 'Time is required!!!'], trim: true })
  name: string;

  @Prop({ required: [true, 'Players are required!!!'] })
  players: Player[];

  // @Prop()
  // username: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
