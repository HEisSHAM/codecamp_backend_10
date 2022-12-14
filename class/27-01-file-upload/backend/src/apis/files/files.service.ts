import { Injectable } from '@nestjs/common';
import { IFilesServiceUpload } from './interfaces/files.service.interface';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  upload({ file }: IFilesServiceUpload): string {
    console.log(file);

    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    //1-1) 스토리지 세팅하기
    const storage = new Storage({
      projectId: '프로젝트 아이디',
      keyFilename: '암호 파일 이름',
    }).bucket('내가만든버킷이름');

    //1-2) 스토리지에 파일 올리기
    file
      .createReadStream()
      .pipe(storage.file(file.filename).createWriteStream())
      .on('finish', () => console.log('성공'))
      .on('error', () => console.log('실패'));

    //create read로 읽어서 pipe로 실행 create write로 업로드

    // 2. 다운로드 URL을 브라우저에 돌려주기
    return '다운로드URL';
  }
}
