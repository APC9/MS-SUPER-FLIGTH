import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { Passenger, PassengerSchema } from './entities/passenger.entity';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PassengerController],
  providers: [PassengerService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Passenger.name,
        schema: PassengerSchema,
      },
    ]),
  ],
})
export class PassengerModule {}
