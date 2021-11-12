import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO, UserEntity } from 'src/models/user/user.entity';
import { DtoFunctionsService } from 'src/services/dto-functions/dto-functions.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly dtoFunctions: DtoFunctionsService,
  ) {}

  public async createUser(): Promise<UserDTO> {
    const user: UserEntity = await this.usersRepository.save(new UserEntity());
    return this.dtoFunctions.userToDTO(user);
  }
}
