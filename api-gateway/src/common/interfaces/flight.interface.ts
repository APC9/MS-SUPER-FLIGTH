import { IPassenger } from './passenger.interface';
import { IWeather } from './weathe.interface';

export interface IFlight {
  _id: string;
  Pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passenger: IPassenger[];
  weather: IWeather[];
}
