import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto } from 'src/dtos/createGroup.dto';
import { Group } from './group.schema';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  async create(body: CreateGroupDto) {
    return await this.groupModel.create(body);
  }

  async findAll() {
    return this.groupModel.find();
  }

  async findOne(id: string) {
    return this.groupModel.findById(id);
  }

  async updateUser(id: string, body: CreateGroupDto) {
    return this.groupModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return this.groupModel.findByIdAndDelete(id);
  }
}
