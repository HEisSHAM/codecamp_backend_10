import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { FilesService } from './files.service';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    return this.filesService.upload({ files });
  }
}

//files
// [
//   Promise {
//     {
//       filename: 'yummy_sushi.jpeg',
//       mimetype: 'image/jpeg',
//       encoding: '7bit',
//       createReadStream: [Function: createReadStream]
//     }
//   },
//   Promise {
//     {
//       filename: 'yummy_chicken.jpeg',
//       mimetype: 'image/jpeg',
//       encoding: '7bit',
//       createReadStream: [Function: createReadStream]
//     }
//   }
// ]
