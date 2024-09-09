import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Hero {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  superpower: string;
}

export const heroSchema = SchemaFactory.createForClass(Hero);
