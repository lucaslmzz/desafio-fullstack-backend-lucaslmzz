import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./client.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @CreateDateColumn()
  createdAt: string;

  @ManyToOne(() => Client, (client) => client.contact)
  @JoinColumn()
  client: Client;
}

export { Contact };
