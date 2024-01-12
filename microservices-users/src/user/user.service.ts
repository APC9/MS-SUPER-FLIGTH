import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.userModel({ ...createUserDto, password: hash });
    return await newUser.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hash = await this.hashPassword(updateUserDto.password);
    const user = { ...updateUserDto, password: hash };
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }
}
