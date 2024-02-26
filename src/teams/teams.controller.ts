import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from 'src/dtos/createTeam.dto';

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Post()
  createTeam(@Body() body: CreateTeamDto) {
    return this.teamsService.create(body);
  }

  @Get()
  findAl() {
    return this.teamsService.findAll();
  }
}
