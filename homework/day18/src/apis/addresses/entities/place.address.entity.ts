import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from '../../places/entities/place.entity';

@Entity()
export class PlaceAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zipcode: string;

  @Column()
  address: string;

  @Column()
  address_detail: string;

  @JoinColumn()
  @OneToOne(() => Place)
  place: Place;
}
