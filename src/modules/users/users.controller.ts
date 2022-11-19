import { FindAllUsersUsecase } from '../../core/app/users/usecases/find-all-users.usecase';
import { CreateUserAndAccountUsecase } from './../../core/app/users/usecases/create-user-and-account.usecase';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/shared/auth/decorators/is-public.decorator';

@Controller('users')
export class UsersController {
  //constructor(private readonly usersService: UsersService) {}

  constructor(
    private createUserAndAccountUsecase: CreateUserAndAccountUsecase,
    private findAllUsersUsecase: FindAllUsersUsecase,
  ) {}

  @IsPublic()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.createUserAndAccountUsecase.execute(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.findAllUsersUsecase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
