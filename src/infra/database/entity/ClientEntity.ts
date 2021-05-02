import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ClientEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "date" })
  birthday: Date;

  constructor(name: string, email: string, birthday: Date) {
    this.name = name;
    this.email = email;
    this.birthday = birthday;
  }
}
