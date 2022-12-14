import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { FilesService } from '../files/files.service';
import { IFilesServiceUpload } from '../files/interfaces/files.service.interface';
import { Storage } from '@google-cloud/storage';

@Resolver()
export class FoodsResolver {
  constructor(
    private readonly foodsService: FoodsService, //
    private readonly filesService: FilesService,
  ) {}
  //Find all//
  @Query(() => [Food])
  fetchProducts(): Promise<Food[]> {
    return this.foodsService.findAll();
  }

  //Find one//
  @Query(() => Food)
  fetchProduct(
    @Args('foodId') foodId: string, //
  ): Promise<Food> {
    return this.foodsService.findOne({ foodId });
  }

  //Create//
  @Mutation(() => Food)
  createFood(
    @Args('createFoodInput') createFoodInput: CreateFoodInput,
  ): Promise<Food> {
    return this.foodsService.create({ createFoodInput });
  }

  //ADD image//
  @Mutation(() => Food)
  async addImage({ files }: IFilesServiceUpload): Promise<string[]> {
    const waitedFiles = await Promise.all(files);
    const bucket = 'yoyoyo';
    const storage = new Storage({
      projectId: 'polar-scene-370203',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${el.filename}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    return results;
  }

  //Update//
  @Mutation(() => Food)
  async updateFood(
    @Args('foodId') foodId: string,
    @Args('updateFoodInput') updateFoodInput: UpdateFoodInput,
  ): Promise<Food> {
    const food = await this.foodsService.findOne({ foodId });
    return this.foodsService.update({
      food,
      updateFoodInput,
    });
  }

  //Delete//
  @Mutation(() => Boolean)
  deleteFood(
    @Args('foodId') foodId: string, //
  ): Promise<boolean> {
    return this.foodsService.delete({ foodId });
  }

  //Restore//
  @Mutation(() => Boolean)
  restoreFood(
    @Args('foodId') foodId: string, //
  ): Promise<boolean> {
    return this.foodsService.restore({ foodId });
  }
}
