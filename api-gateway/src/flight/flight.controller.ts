import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable, lastValueFrom } from 'rxjs';

import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { IFlight } from '../common/interfaces/flight.interface';
import { FlightMSG, PassengerMSG } from '../common/constants';

@ApiTags('flights')
@Controller('api/v2/flight')
export class FlightController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxyFlight = this.clientProxy.clientProxyFligths();
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() createFlightDto: CreateFlightDto): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.CREATE, createFlightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlight.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Observable<IFlight> {
    return this._clientProxyFlight.send(FlightMSG.UPDATE, {
      id,
      updateFlightDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._clientProxyFlight.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await lastValueFrom(
      this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, passengerId),
    );

    if (!passenger)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

    return this._clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passengerId,
    });
  }
}
