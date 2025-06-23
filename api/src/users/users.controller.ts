import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { FastifyReply } from 'fastify';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Res() res: FastifyReply): Promise<void> {
    let users: User[] = []
    try {users = await this.usersService.findAll();
    } catch (error) {
      console.error('Error fetching users:', error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'An error occurred while fetching users.' });
    }

    return res.status(HttpStatus.OK).send(users);
  }
}
