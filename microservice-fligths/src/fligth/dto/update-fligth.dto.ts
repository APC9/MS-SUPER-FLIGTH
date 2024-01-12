import { PartialType } from '@nestjs/mapped-types';
import { CreateFligthDto } from './create-fligth.dto';

export class UpdateFligthDto extends PartialType(CreateFligthDto) {}
