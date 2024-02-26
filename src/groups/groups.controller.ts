import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from 'src/dtos/createGroup.dto';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Post()
  createGroup(@Body() body: CreateGroupDto) {
    return this.groupsService.create(body);
  }

  @Get()
  findAllGroups() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOneGroup(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  updateOneGroup(@Param('id') id: string, @Body() body: CreateGroupDto) {
    return this.groupsService.updateUser(id, body);
  }

  @Delete(':id')
  deleteOneGroup(@Param('id') id: string) {
    return this.groupsService.delete(id);
  }
}
