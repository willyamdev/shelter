import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Password extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  label: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
  date: string;
  @Column()
  initializationVector: string;
}
