import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Client } from "./client.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Client)
  client: Client;
}

export { Contact };
