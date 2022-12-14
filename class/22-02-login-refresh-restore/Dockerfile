# 1. 운영체제 설치 (node 14 버전, npa, yarn 모두 설치 된 리눅스 )
FROM node:14


# 2.내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
   
COPY ./package.json /myfolder/         
COPY ./yarn.lock /myfolder/         
#모든 파일 myfolder로 감
WORKDIR /myfolder/
#터미널이 위 폴더로 들어가서 작업함
RUN yarn install
# node에 yarn 이미 설치 되어있음
# package.json은 my folder에 짱박혀있으므로 따라가서 yarn install 해야함

COPY . /myfolder/ 


# 3. 도커 안에서 index.js 실행 시키기
CMD yarn start:dev


#docker port fowarding,  docker run -p 2000:3000 id# 식으로 지정
#들어가는 port 번호 / docker 안쪽 포트 번호는 서로 일치해야함
# docker ps 타이핑해서 포트 열렸는 지 확인
# 0.0.0.0 => 누구든지 접속 가능하다는 뜻
# 127.0.0.1 => 나 자신