import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { IFilesServiceUpload } from './interfaces/files.service.interface';
import { getToday } from 'src/commons/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  async upload({ files }: IFilesServiceUpload): Promise<string[]> {
    const waitedFiles = await Promise.all(files);

    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const bucket = 'yoyoyo';
    const storage = new Storage({
      projectId: 'polar-scene-370203',
      keyFilename: 'gcp-file-storage.json',
    }).bucket(bucket);

    // 1-2) 스토리지에 파일 올리기
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            const fname = `${getToday()}/${uuidv4}/origin/${el.filename}`;

            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () => resolve(`${bucket}/${fname}`))
              .on('error', () => reject('실패'));
          }),
      ),
    );

    // 2. 다운로드URL 브라우저에 돌려주기
    return results;
  }
}

//waited files ////////////////////////
// [
//   {
//     filename: 'yummy_sushi.jpeg',
//     mimetype: 'image/jpeg',
//     encoding: '7bit',
//     createReadStream: [Function: createReadStream]
//   },
//   {
//     filename: 'yummy_chicken.jpeg',
//     mimetype: 'image/jpeg',
//     encoding: '7bit',
//     createReadStream: [Function: createReadStream]
//   }
// ]

//results ////////////////////////
// [ 'yoyoyo/yummy_sushi.jpeg', 'yoyoyo/yummy_chicken.jpeg' ]

// storage ////////////////////////
// Bucket {
//   _events: [Object: null prototype] {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   metadata: {},
//   baseUrl: '/b',
//   parent: Storage {
//     baseUrl: 'https://storage.googleapis.com/storage/v1',
//     apiEndpoint: 'https://storage.googleapis.com',
//     timeout: undefined,
//     globalInterceptors: [],
//     interceptors: [],
//     packageJson: {
//       name: '@google-cloud/storage',
//       description: 'Cloud Storage Client Library for Node.js',
//       version: '6.8.0',
//       license: 'Apache-2.0',
//       author: 'Google Inc.',
//       engines: [Object],
//       repository: 'googleapis/nodejs-storage',
//       main: './build/src/index.js',
//       types: './build/src/index.d.ts',
//       files: [Array],
//       keywords: [Array],
//       scripts: [Object],
//       dependencies: [Object],
//       devDependencies: [Object]
//     },
//     projectId: 'polar-scene-370203',
//     projectIdRequired: false,
//     providedUserAgent: undefined,
//     makeAuthenticatedRequest: [Function: makeAuthenticatedRequest] {
//       getCredentials: [Function: bound getCredentials],
//       authClient: [GoogleAuth]
//     },
//     authClient: GoogleAuth {
//       checkIsGCE: undefined,
//       jsonContent: null,
//       cachedCredential: null,
//       _cachedProjectId: 'polar-scene-370203',
//       keyFilename: 'gcp-file-storage.json',
//       scopes: [Array],
//       clientOptions: undefined
//     },
//     getCredentials: [Function: bound getCredentials],
//     acl: {
//       OWNER_ROLE: 'OWNER',
//       READER_ROLE: 'READER',
//       WRITER_ROLE: 'WRITER'
//     },
//     crc32cGenerator: [Function: CRC32C_DEFAULT_VALIDATOR_GENERATOR],
//     retryOptions: {
//       autoRetry: true,
//       maxRetries: 3,
//       retryDelayMultiplier: 2,
//       totalTimeout: 600,
//       maxRetryDelay: 64,
//       retryableErrorFn: [Function: RETRYABLE_ERR_FN_DEFAULT],
//       idempotencyStrategy: 1
//     },
//     getBucketsStream: [Function (anonymous)],
//     getHmacKeysStream: [Function (anonymous)]
//   },
//   id: 'yoyoyo',
//   createMethod: [Function: bound wrapper],
//   methods: {
//     create: { reqOpts: [Object] },
//     delete: { reqOpts: [Object] },
//     exists: { reqOpts: [Object] },
//     get: { reqOpts: [Object] },
//     getMetadata: { reqOpts: [Object] },
//     setMetadata: { reqOpts: [Object] }
//   },
//   interceptors: [],
//   projectId: undefined,
//   name: 'yoyoyo',
//   storage: Storage {
//     baseUrl: 'https://storage.googleapis.com/storage/v1',
//     apiEndpoint: 'https://storage.googleapis.com',
//     timeout: undefined,
//     globalInterceptors: [],
//     interceptors: [],
//     packageJson: {
//       name: '@google-cloud/storage',
//       description: 'Cloud Storage Client Library for Node.js',
//       version: '6.8.0',
//       license: 'Apache-2.0',
//       author: 'Google Inc.',
//       engines: [Object],
//       repository: 'googleapis/nodejs-storage',
//       main: './build/src/index.js',
//       types: './build/src/index.d.ts',
//       files: [Array],
//       keywords: [Array],
//       scripts: [Object],
//       dependencies: [Object],
//       devDependencies: [Object]
//     },
//     projectId: 'polar-scene-370203',
//     projectIdRequired: false,
//     providedUserAgent: undefined,
//     makeAuthenticatedRequest: [Function: makeAuthenticatedRequest] {
//       getCredentials: [Function: bound getCredentials],
//       authClient: [GoogleAuth]
//     },
//     authClient: GoogleAuth {
//       checkIsGCE: undefined,
//       jsonContent: null,
//       cachedCredential: null,
//       _cachedProjectId: 'polar-scene-370203',
//       keyFilename: 'gcp-file-storage.json',
//       scopes: [Array],
//       clientOptions: undefined
//     },
//     getCredentials: [Function: bound getCredentials],
//     acl: {
//       OWNER_ROLE: 'OWNER',
//       READER_ROLE: 'READER',
//       WRITER_ROLE: 'WRITER'
//     },
//     crc32cGenerator: [Function: CRC32C_DEFAULT_VALIDATOR_GENERATOR],
//     retryOptions: {
//       autoRetry: true,
//       maxRetries: 3,
//       retryDelayMultiplier: 2,
//       totalTimeout: 600,
//       maxRetryDelay: 64,
//       retryableErrorFn: [Function: RETRYABLE_ERR_FN_DEFAULT],
//       idempotencyStrategy: 1
//     },
//     getBucketsStream: [Function (anonymous)],
//     getHmacKeysStream: [Function (anonymous)]
//   },
//   userProject: undefined,
//   acl: Acl {
//     owners: {
//       addAllAuthenticatedUsers: [Function (anonymous)],
//       deleteAllAuthenticatedUsers: [Function (anonymous)],
//       addAllUsers: [Function (anonymous)],
//       deleteAllUsers: [Function (anonymous)],
//       addDomain: [Function (anonymous)],
//       deleteDomain: [Function (anonymous)],
//       addGroup: [Function (anonymous)],
//       deleteGroup: [Function (anonymous)],
//       addProject: [Function (anonymous)],
//       deleteProject: [Function (anonymous)],
//       addUser: [Function (anonymous)],
//       deleteUser: [Function (anonymous)]
//     },
//     readers: {
//       addAllAuthenticatedUsers: [Function (anonymous)],
//       deleteAllAuthenticatedUsers: [Function (anonymous)],
//       addAllUsers: [Function (anonymous)],
//       deleteAllUsers: [Function (anonymous)],
//       addDomain: [Function (anonymous)],
//       deleteDomain: [Function (anonymous)],
//       addGroup: [Function (anonymous)],
//       deleteGroup: [Function (anonymous)],
//       addProject: [Function (anonymous)],
//       deleteProject: [Function (anonymous)],
//       addUser: [Function (anonymous)],
//       deleteUser: [Function (anonymous)]
//     },
//     writers: {
//       addAllAuthenticatedUsers: [Function (anonymous)],
//       deleteAllAuthenticatedUsers: [Function (anonymous)],
//       addAllUsers: [Function (anonymous)],
//       deleteAllUsers: [Function (anonymous)],
//       addDomain: [Function (anonymous)],
//       deleteDomain: [Function (anonymous)],
//       addGroup: [Function (anonymous)],
//       deleteGroup: [Function (anonymous)],
//       addProject: [Function (anonymous)],
//       deleteProject: [Function (anonymous)],
//       addUser: [Function (anonymous)],
//       deleteUser: [Function (anonymous)]
//     },
//     pathPrefix: '/acl',
//     request_: [Function: bound request],
//     default: Acl {
//       owners: [Object],
//       readers: [Object],
//       writers: [Object],
//       pathPrefix: '/defaultObjectAcl',
//       request_: [Function: bound request]
//     }
//   },
//   crc32cGenerator: [Function: CRC32C_DEFAULT_VALIDATOR_GENERATOR],
//   iam: Iam {
//     request_: [Function: bound request],
//     resourceId_: 'buckets/[object Promise]'
//   },
//   getFilesStream: [Function (anonymous)],
//   instanceRetryValue: true,
//   instancePreconditionOpts: undefined,
//   [Symbol(kCapture)]: false
// }
