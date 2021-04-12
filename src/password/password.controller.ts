import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePasswordDTO } from './dto/request/create-password.dto';
import { DeletePasswordDTO } from './dto/request/delete-password.dto';
import { UpdatePasswordDTO } from './dto/request/update-password.dto';
import { DecryptedPasswordDTO } from './dto/response/decrypted-password';
import { DeletedPasswordDTO } from './dto/response/deleted-password';
import { Password } from './entities/password.entity';
import { PasswordService } from './password.service';

@UseGuards(AuthGuard())
@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createPassword(@Body() password: CreatePasswordDTO): Promise<Password> {
    return this.passwordService.createPassword(password);
  }

  @Get('/decrypt')
  @UsePipes(ValidationPipe)
  async decryptPassword(
    @Query('id') id: string,
    @Query('secretKey') secretKey: string,
  ): Promise<DecryptedPasswordDTO> {
    return this.passwordService.decryptPassword(id, secretKey);
  }

  @Get('/get-all-passwords')
  async getAllPasswords(@Query('limit') limit: number): Promise<Password[]> {
    return this.passwordService.getAllPassword(limit);
  }

  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async deletePassword(
    @Param('id') id: string,
    @Body() password: DeletePasswordDTO,
  ): Promise<DeletedPasswordDTO> {
    return this.passwordService.deletePassword(id, password);
  }

  @Post('/update/:id')
  @UsePipes(ValidationPipe)
  async updatePassword(
    @Param('id') id: string,
    @Body() password: UpdatePasswordDTO,
  ): Promise<Password> {
    return this.passwordService.updatePassword(id, password);
  }
}
