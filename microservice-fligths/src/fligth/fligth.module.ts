import { Module } from '@nestjs/common';
import { FligthService } from './fligth.service';
import { FligthController } from './fligth.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from './entities/fligth.entity';
import { Passenger, PassengerSchema } from './entities/passenger.entity';

@Module({
  controllers: [FligthController],
  providers: [FligthService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Flight.name,
        schema: FlightSchema,
      },
      {
        name: Passenger.name,
        schema: PassengerSchema,
      },
    ]),
  ],
})
export class FligthModule {}
