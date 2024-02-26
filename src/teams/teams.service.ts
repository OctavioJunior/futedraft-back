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

  async sortTeam() {
    const players = await this.playersService.findAll();
    const sortedPlayers = players.sort((a, b) => b.average - a.average);

    // const numberOfTeams = teamsQuantity;

    const team1: Player[] = [];
    const team2: Player[] = [];

    let totalTeam1 = 0;
    let totalTeam2 = 0;

    sortedPlayers.forEach((player, index) => {
      if (index % 2 === 0) {
        team1.push(player);
        totalTeam1 += player.average;
      } else {
        team2.push(player);
        totalTeam2 += player.average;
      }
    });

    if (team1.length > team2.length) {
      const playerToMove = team1.pop();
      team2.push(playerToMove);
      totalTeam1 -= playerToMove.average;
      totalTeam2 += playerToMove.average;
    } else if (team2.length > team1.length) {
      const playerToMove = team2.pop();
      team1.push(playerToMove);
      totalTeam2 -= playerToMove.average;
      totalTeam1 += playerToMove.average;
    }

    return {
      team1,
      team2,
      averageTeam1: totalTeam1 / team1.length,
      averageTeam2: totalTeam2 / team2.length,
    };
  }
}
