import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Flight extends Document {
  @Prop({
    required: true,
  })
  pilot: string;

  @Prop({
    required: true,
  })
  airplane: string;

  @Prop({
    required: true,
  })
  destinationCity: string;

  @Prop({
    required: true,
  })
  flightDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    required: true,
  })
  passengers: mongoose.Schema.Types.ObjectId[];
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
