# 컴퓨터 만드는 설명서


# 1. 운영체제 설치 (node 14 버전, npa, yarn 모두 설치 된 리눅스 )
FROM node:14


#DOCKER 실행 2단계  1- 최적화+압축하기 (이미지)  2- 이미지 실행시키기
# 2.내 컴퓨터에 있는 폴더나 파일을 도커 컴퓨터 안으로 복사하기
COPY ./index.js /index.js
# RUN node index.js 
#최적화에 포함 RUN까지 이미지로 만들어서 저장

#=================================================================
# 3. 도커 안에서 index.js 실행 시키기
# 이미지 실행시키는 명령어 CMD, CMD는 한번만 쓸 수 있다.
CMD node index.js


#docker bulid .                             - 작성한 도커 만들기
#docker images                              - 생성한 이미지 조회
#docker run #image                          - 도커 실행
#docker ps (process)                        - 생성한 도커 조회
#docker exec -it #container /bin /bash      - container# 찍어서 도커 들어가기
#docker stop #container                     - 도커 끄기