import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { Team, TeamSchema } from './team.schema';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
    PlayersModule,
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
