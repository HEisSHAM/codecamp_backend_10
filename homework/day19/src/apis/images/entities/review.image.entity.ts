import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class ReviewImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  is_main: boolean;

  @ManyToOne(() => Review)
  review: Review;
}
