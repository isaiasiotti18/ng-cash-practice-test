import { ViewMyBalanceAccountUsecase } from '../../core/app/users/usecases/view-my-balance-account.usecase';
import { FindAllUsersUsecase } from '../../core/app/users/usecases/find-all-users.usecase';
import { CreateUserAndAccountUsecase } from '../../core/app/users/usecases/create-user-and-account.usecase';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/shared/auth/decorators/is-public.decorator';
import { AuthRequest } from 'src/shared/auth/models/AuthRequest';

@Controller('users')
export class UsersController {
  //constructor(private readonly usersService: UsersService) {}

  constructor(
    private createUserAndAccountUsecase: CreateUserAndAccountUsecase,
    private findAllUsersUsecase: FindAllUsersUsecase,
    private viewMyBalanceAccountUsecase: ViewMyBalanceAccountUsecase,
  ) {}

  @IsPublic()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createUserAndAccountUsecase.execute(createUserDto);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/view-balance')
  async viewMyBalance(@Request() req: AuthRequest) {
    try {
      return await this.viewMyBalanceAccountUsecase.execute(req.user.id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
