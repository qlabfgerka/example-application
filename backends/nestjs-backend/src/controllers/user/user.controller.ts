import { Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/models/user/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(): Promise<UserDTO> {
    return await this.userService.createUser();
  }
}
