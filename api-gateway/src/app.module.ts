import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    UserModule,
    PassengerModule,
    FlightModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
