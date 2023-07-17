import { Optional } from '@nestjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Book')
export class Book {
  @PrimaryColumn()
  importId: string;

  @Optional()
  @Column({ nullable: true })
  title?: string;

  @Optional()
  @Column({ nullable: true })
  authors?: string;

  @Optional()
  @Column({ nullable: true })
  releaseDate?: string;

  @Optional()
  @Column({ nullable: true })
  pages?: number;

  @Optional()
  @Column({ nullable: true })
  isbn?: string;

  @Optional()
  @Column({ nullable: true })
  publishers?: string;

  @Optional()
  @Column({ nullable: true })
  monthRead?: string;

  @Optional()
  @Column({ nullable: true })
  description?: string;

  @Optional()
  @Column({ nullable: true })
  review?: string;

  @Optional()
  @Column({ nullable: true })
  googleId?: string;

  @Optional()
  @Column({ nullable: true })
  image?: string;

  @Optional()
  @Column()
  createdAt?: Date;

  @Optional()
  @Column()
  updatedAt?: Date;
}
