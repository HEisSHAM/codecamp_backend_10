import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Place } from '../../places/entities/place.entity';

@Entity()
export class PlaceImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  is_main: boolean;

  @ManyToOne(() => Place)
  place: Place;
}
