import { LoginRequestBody } from './models/LoginRequestBody';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../../core/domain/users/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    // Transforma o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      username: user.username,
      accountId: user.accountId,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser({ username, password }: LoginRequestBody) {
    const user = await this.usersService.findByUsername(username);

    if (user) {
      // checar se a senha informada corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    // Se chegar aqui, significa que não encontrou um user e/ou a senha não corresponde
    throw new Error('Username or password provided is incorrect.');
  }
}
