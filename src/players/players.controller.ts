import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from 'src/dtos/createPlayer.dto';

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Post()
  createPlayer(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }

  @Get()
  findAllPlayers() {
    return this.playersService.findAll();
  }

  @Get(':id')
  findOnePlayer(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @Patch(':id')
  updateOnePlayer(@Param('id') id: string, @Body() body: CreatePlayerDto) {
    return this.playersService.updatePlayer(id, body);
  }

  @Delete(':id')
  deleteOnePlayer(@Param('id') id: string) {
    return this.playersService.delete(id);
  }
}
