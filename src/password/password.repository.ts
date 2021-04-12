import { EntityRepository, Repository } from 'typeorm';
import { CreatePasswordDTO } from './dto/request/create-password.dto';
import { Password } from './entities/password.entity';
import { EncryptionType } from '../cryptography/interfaces/encryption-type.interface';

@EntityRepository(Password)
export class PasswordRepository extends Repository<Password> {
  async createPassword(
    passwordObject: CreatePasswordDTO,
    encryption: EncryptionType,
  ): Promise<Password> {
    const { label, email } = passwordObject;
    const { encryptedValue, initializationVector } = encryption;

    const newPassword = new Password();
    newPassword.label = label;
    newPassword.email = email;
    newPassword.password = encryptedValue;
    newPassword.initializationVector = initializationVector;

    await newPassword.save();

    return newPassword;
  }

  async getAllPasswords(limit: number): Promise<Password[]> {
    const query = this.createQueryBuilder('password')
      .limit(limit)
      .orderBy('password.date', 'DESC');

    const jobs = await query.getMany();

    return jobs;
  }
}
