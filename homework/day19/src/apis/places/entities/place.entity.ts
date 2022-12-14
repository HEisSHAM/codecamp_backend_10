import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceCategory } from '../../categories/entities/place.category.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  open_time: string;

  @Column()
  close_time: string;

  @Column()
  minimum_order: number;

  @Column()
  business_num: string;

  @Column()
  created_at: Date;

  @Column()
  revised_at: Date;

  @Column()
  removed_at: Date;

  @ManyToOne(() => PlaceCategory)
  placeCategory: PlaceCategory;
}
