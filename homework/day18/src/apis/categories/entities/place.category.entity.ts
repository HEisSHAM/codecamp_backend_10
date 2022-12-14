import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlaceCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;
}
