import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FoodCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;
}
