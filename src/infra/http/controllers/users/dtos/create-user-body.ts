import { IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  password?: string;

  @IsNotEmpty()
  role: 'ADMIN' | 'USER';
}
