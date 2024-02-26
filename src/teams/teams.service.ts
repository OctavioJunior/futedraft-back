import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './team.schema';
import { CreateTeamDto } from 'src/dtos/createTeam.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<Team>,
    private readonly playersService: PlayersService,
  ) {}

  async create(body: CreateTeamDto) {
    const { name } = body;
    const players = await this.playersService.findAll();

    const createdTeam = new this.teamModel({
      name,
      players,
    });

    await createdTeam.save();

    return createdTeam;

    // return await createdTeam.save();
  }

  async findAll() {
    return this.teamModel.find();
  }
}
