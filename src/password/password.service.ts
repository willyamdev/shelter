import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePasswordDTO } from './dto/request/create-password.dto';
import { PasswordRepository } from './password.repository';
import { EncryptionType } from '../cryptography/interfaces/encryption-type.interface';
import { Password } from './entities/password.entity';
import { DecryptedPasswordDTO } from './dto/response/decrypted-password';
import { DeletePasswordDTO } from './dto/request/delete-password.dto';
import { DeletedPasswordDTO } from './dto/response/deleted-password';
import { UpdatePasswordDTO } from './dto/request/update-password.dto';
import { CryptographyService } from 'src/cryptography/cryptography.service';

@Injectable()
export class PasswordService {
  //   ENCRYPTION_KEY = 'qwertyuiopasdfghjklzxcvbnmgfdsaw'; // Must be 256 bits (32 characters)

  constructor(
    @InjectRepository(PasswordRepository)
    private passwordRepository: PasswordRepository,
    private cryptographyService: CryptographyService,
  ) {}

  async createPassword(password: CreatePasswordDTO): Promise<Password> {
    const encrypted: EncryptionType = this.cryptographyService.encrypt(
      password.password,
      password.secretKey,
    );

    const newPassword = await this.passwordRepository.createPassword(
      password,
      encrypted,
    );

    newPassword.password = password.password;
    delete newPassword.initializationVector;

    return newPassword;
  }

  async getPassword(passwordId: string): Promise<Password> {
    const foundPassword = await this.passwordRepository.findOne(passwordId);

    if (!foundPassword) {
      throw new NotFoundException(`Password with id ${passwordId} not found!`);
    }

    return foundPassword;
  }

  async decryptPassword(
    id: string,
    secretKey: string,
  ): Promise<DecryptedPasswordDTO> {
    const foundPassword = await this.getPassword(id);

    const encryptedPassword: EncryptionType = {
      encryptedValue: foundPassword.password,
      initializationVector: foundPassword.initializationVector,
    };

    const decrypted = this.cryptographyService.decrypt(
      encryptedPassword,
      secretKey,
    );

    const decryptPassword = new DecryptedPasswordDTO();
    decryptPassword.id = foundPassword.id;
    decryptPassword.label = foundPassword.label;
    decryptPassword.email = foundPassword.email;
    decryptPassword.password = decrypted;
    decryptPassword.date = foundPassword.date;

    return decryptPassword;
  }

  async deletePassword(
    id: string,
    password: DeletePasswordDTO,
  ): Promise<DeletedPasswordDTO> {
    const foundPassword = await this.getPassword(id);

    const encryptedPassword: EncryptionType = {
      encryptedValue: foundPassword.password,
      initializationVector: foundPassword.initializationVector,
    };

    this.cryptographyService.decrypt(encryptedPassword, password.secretKey);

    const result = this.passwordRepository.delete(id);

    const response = new DeletedPasswordDTO();

    if ((await result).affected === 0) {
      response.deletedPasswords = 0;
      response.message = `Check if id ${id} exists`;
    } else {
      response.deletedPasswords = (await result).affected;
      response.message = `password sucessfully deleted`;
    }

    return response;
  }

  async updatePassword(
    id: string,
    password: UpdatePasswordDTO,
  ): Promise<Password> {
    const foundPassword = await this.getPassword(id);

    const encryptedPassword: EncryptionType = {
      encryptedValue: foundPassword.password,
      initializationVector: foundPassword.initializationVector,
    };

    this.cryptographyService.decrypt(
      encryptedPassword,
      password.oldPasswordSecretKey,
    );

    const encrypted: EncryptionType = this.cryptographyService.encrypt(
      password.password,
      password.secretKey,
    );

    foundPassword.password = encrypted.encryptedValue;
    foundPassword.initializationVector = encrypted.initializationVector;
    foundPassword.label = password.label;
    foundPassword.email = password.email;
    await foundPassword.save();

    foundPassword.password = password.password;
    delete foundPassword.initializationVector;

    return foundPassword;
  }

  async getAllPassword(limit: number): Promise<Password[]> {
    const passwordsList: Password[] = await this.passwordRepository.getAllPasswords(
      limit,
    );

    passwordsList.forEach((p) => {
      p.password = '**************';
      delete p.initializationVector;
    });

    return passwordsList;
  }
}
