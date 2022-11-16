import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
