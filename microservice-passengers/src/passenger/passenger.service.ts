import { HttpStatus, Injectable } from '@nestjs/common';
import { Passenger } from './entities/passenger.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/IPassenger.interface';
import { PassengerDto } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(Passenger.name) private readonly model: Model<Passenger>,
  ) {}

  async create(passengerDTO: PassengerDto): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }

  async findAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDTO: PassengerDto): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
