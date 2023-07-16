import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Book')
export class Book {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  pages: number;

  @Column()
  isbn: string;

  @Column()
  publisher: string;

  @Column()
  monthRead: string;

  @Column()
  description: string;

  @Column()
  review: string;

  @Column()
  googleId: string;

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
