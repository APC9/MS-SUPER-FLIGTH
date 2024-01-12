import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, ObjectId } from 'mongoose';
import axios from 'axios';
import moment from 'moment';

import { Flight } from './entities/fligth.entity';
import { CreateFligthDto } from './dto/create-fligth.dto';
import { UpdateFligthDto } from './dto/update-fligth.dto';
import { ILocation, IWeather, IFlight } from '../common/interfaces';
import { Passenger } from './entities/passenger.entity';
import { IPassenger } from '../common/interfaces/passenger.interface';

@Injectable()
export class FligthService {
  constructor(
    @InjectModel(Flight.name)
    private readonly flightModel: Model<Flight>,

    @InjectModel(Passenger.name)
    private readonly passengerModel: Model<Passenger>,
  ) {}

  async getLocation(destinationCity: string): Promise<ILocation> {
    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${destinationCity}`,
    );
    return data[0];
  }

  async getWeather(woeid: number, flightDate: Date): Promise<IWeather[]> {
    const dateFormat = moment.utc(flightDate).format();

    const year = dateFormat.substring(0, 4);
    const month = dateFormat.substring(5, 7);
    const day = dateFormat.substring(8, 10);

    const { data } = await axios.get(
      `https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`,
    );
    return data;
  }

  assign(
    { _id, pilot, airplane, destinationCity, flightDate, passengers }: IFlight,
    weather: IWeather[],
  ): IFlight {
    return Object.assign({
      _id,
      pilot,
      airplane,
      destinationCity,
      flightDate,
      passengers,
      weather,
    });
  }

  async create(createFligthDto: CreateFligthDto) {
    const newFlight = new this.flightModel(createFligthDto);
    return await newFlight.save();
  }

  async findAll() {
    return await this.flightModel.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    const {
      id: _id,
      pilot,
      airplane,
      destinationCity,
      flightDate,
      passengers,
    } = await this.flightModel.findById(id).populate('passengers');

    const newPassengers: IPassenger[] = await Promise.all(
      this.convertedPassengers(passengers),
    );

    const flight = {
      _id,
      pilot,
      airplane,
      destinationCity,
      flightDate,
      passengers: newPassengers,
    };

    const location: ILocation = await this.getLocation(flight.destinationCity);

    const weather: IWeather[] = await this.getWeather(
      location.woeid,
      flight.flightDate,
    );

    const newFlight: IFlight = {
      ...flight,
      weather,
    };

    return this.assign(newFlight, weather);
  }

  async update(id: string, updateFligthDto: UpdateFligthDto) {
    return await this.flightModel.findByIdAndUpdate(id, updateFligthDto, {
      new: true,
    });
  }

  async remove(id: string) {
    await this.flightModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.flightModel
      .findByIdAndUpdate(
        flightId,
        {
          $addToSet: { passengers: passengerId },
        },
        { new: true },
      )
      .populate('passenger');
  }

  private convertedPassengers(passengers: ObjectId[]) {
    const convertedPassengers = passengers.map(async (passengersId) => {
      const passengerDoc = await this.passengerModel.findById(passengersId);
      if (!passengerDoc) return null;
      const { name, email } = passengerDoc;
      return { name, email };
    });
    return convertedPassengers;
  }
}
