import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emailAuthorization')
export class EmailAuthorization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  code: string;
  @Column({ nullable: true })
  codeIv: string;
}
