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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxySuperFlights } from '../common/proxy/client-proxy';
import { UserMSG } from '../common/constants';
import { IUser } from '../common/interfaces/user.interface';

@ApiTags('users')
@Controller('api/v2/users')
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private _clienteProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this._clienteProxyUser.send(UserMSG.CREATE, createUserDto);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this._clienteProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IUser> {
    return this._clienteProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Observable<IUser> {
    return this._clienteProxyUser.send(UserMSG.UPDATE, { id, updateUserDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this._clienteProxyUser.send(UserMSG.DELETE, id);
  }
}
