# 1. 운영체제 설치 (node 14 버전, npa, yarn 모두 설치 된 리눅스 )
FROM node:14

# 2.내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY . /myfolder/ 
WORKDIR /myfolder/
#터미널이 위 폴더로 들어가서 작업함
RUN yarn install

# 3. 도커 안에서 index.js 실행 시키기
CMD yarn start:dev