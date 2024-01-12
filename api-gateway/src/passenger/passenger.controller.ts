import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Observable } from 'rxjs';

import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { PassengerMSG } from '../common/constants';
import { IPassenger } from '../common/interfaces/passenger.interface';

@ApiTags('passengers')
@Controller('api/v2/passenger')
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clientProxPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Observable<IPassenger> {
    return this._clientProxPassenger.send(
      PassengerMSG.CREATE,
      createPassengerDto,
    );
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this._clientProxPassenger.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger[]> {
    return this._clientProxPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Observable<IPassenger> {
    return this._clientProxPassenger.send(PassengerMSG.UPDATE, {
      id,
      updatePassengerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._clientProxPassenger.send(PassengerMSG.DELETE, id);
  }
}
