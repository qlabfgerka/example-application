import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from 'src/models/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DtoFunctionsModule } from 'src/services/dto-functions/dto-functions.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserEntity]), DtoFunctionsModule],
})
export class UserModule {}
