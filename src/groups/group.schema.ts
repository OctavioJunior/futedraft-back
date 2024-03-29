import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  @Prop({ required: [true, 'Group name is required!!!'], trim: true })
  name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
