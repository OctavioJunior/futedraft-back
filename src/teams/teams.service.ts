import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './team.schema';
import { CreateTeamDto } from 'src/dtos/createTeam.dto';
import { PlayersService } from 'src/players/players.service';
import { Player } from 'src/players/player.schema';

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
  }

  async findAll() {
    return this.teamModel.find();
  }

  async sortTeam(teamsQuantity: number) {
    if (teamsQuantity <= 0) {
      throw new Error('Número inválido de equipes');
    }

    const players = await this.playersService.findAll();
    const sortedPlayers = players.sort((a, b) => b.average - a.average);

    const teams: Player[][] = new Array(teamsQuantity).fill([]).map(() => []);
    const totals: number[] = new Array(teamsQuantity).fill(0);

    sortedPlayers.forEach((player) => {
      const minTotalIndex = totals.indexOf(Math.min(...totals));
      teams[minTotalIndex].push(player);
      totals[minTotalIndex] += player.average;
    });

    const averages = totals.map((total, index) => total / teams[index].length);

    return {
      teams,
      averages,
    };
  }
}
