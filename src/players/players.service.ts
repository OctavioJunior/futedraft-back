import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './player.schema';
import { CreatePlayerDto } from 'src/dtos/createPlayer.dto';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<Player>) {}

  async create(body: CreatePlayerDto) {
    return await this.playerModel.create(body);
  }

  async findAll() {
    return this.playerModel.find();
  }

  async findOne(id: string) {
    return this.playerModel.findById(id);
  }

  async updatePlayer(id: string, body: CreatePlayerDto) {
    return this.playerModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string) {
    return this.playerModel.findByIdAndDelete(id);
  }
}
