import { Controller } from '@nestjs/common';
import { FligthService } from './fligth.service';
import { CreateFligthDto } from './dto/create-fligth.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';

@Controller()
export class FligthController {
  constructor(private readonly fligthService: FligthService) {}

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() createFligthDto: CreateFligthDto) {
    return this.fligthService.create(createFligthDto);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  findAll() {
    return this.fligthService.findAll();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.fligthService.findOne(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.fligthService.update(payload.id, payload.updateFligthDto);
  }

  @MessagePattern(FlightMSG.DELETE)
  remove(@Payload() id: string) {
    return this.fligthService.remove(id);
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    return this.fligthService.addPassenger(payload.id, payload.passengerId);
  }
}
