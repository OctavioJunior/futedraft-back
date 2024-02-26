import { CreateUserDto } from './../dtos/createUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(body: CreateUserDto) {
    return await this.userModel.create(body);
  }

  async findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, body: CreateUserDto) {
    return this.userModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
