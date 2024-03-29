import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({
    index: true,
    required: true,
  })
  name: string;

  @Prop({
    index: true,
    required: true,
  })
  username: string;

  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  email: string;

  @Prop({
    index: true,
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
