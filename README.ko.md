# show-me-the-video
SMTV(Show Me The Video) 는 비디오 콘텐츠을 포함한 Markdown 문서를 파싱하여
YouTube를 닮은 비디오 클립 웹페이지를 생성해주는 프로젝트. github, gitlab 과
같은 어떤 git 저장소도 소스로 사용 할 수 있음.

git 저장소 루트 경로에 `show-me-the-video` 라는 디렉토리를 생성하고 이 안에
마크다운(`.md`) 파일을 아래 규칙과 같이 작성하는 것만으로 YouTube 와 같은
비디오 클립 웹페이지를 가질 수 있음. [git 저장소 예제][smtv_example] 참고!

# 유저 가이드

## Markdown rules

```markdown
[videoUrl]: http://local-static.aluc.io:8998/video1.mkv "click to checkout"
[thumbnailUrl]: http://local-static.aluc.io:8998/resized.256/video1.jpg
[tags]: windows,linux
[prev]: ./previousMarkdownContent.md
[next]: ./nextMarkdownContent.md
[duration]: 2:30
[author]: alfreduc
[createTime]: 20181127
[updateTime]: 20181127

# 제목

## 부제목 (선택사항)

[![video][thumbnailUrl]][videoUrl]

비디오에 대한 설명이나 관련 링크 그 밖의 텍스트 콘텐츠를 마크다운 포맷으로
자유롭게 작성
```

`[![video][thumbnailUrl]][videoUrl]` 부분이 파싱되어 비디오 플레이어 영역으로
렌더링 됨. 이 부분이 없으면 비디오 플레이어가 나타나지 않음.

## 속성들

| property     | isRequired | description                        |
|----------    |----------- |----------------------------------- |
| videoUrl     |   required | 비디오 url                         |
| thumbnailUrl |   optional | 썸네일 이미지 url                  |
| tags         |   optional | `,` 로 구분된 태그                 |
| prev         |   optional | 관련있는 이전 문서                 |
| next         |   optional | 관련있는 다음 문서                 |
| duration     |   optional | 재생시간                           |
| author       |   optional | 저자                               |
| createTime   |   optional | 생성 시간                          |
| updateTime   |   optional | 변경 시간                          |

# 개발 가이드

## 환경변수 셋팅

```sh
export SMTV_CLONE_REPO_URL=https://github.com/aluc-io/show-me-the-video-example.git
export SMTV_PUBLIC_REPO_URL=https://github.com/aluc-io/show-me-the-video-example
export SMTV_TITLE="My Video Clip"
export SMTV_REPO_TYPE=GITLAB # GITLAB | GITHUB
export SMTV_SHOW_LAYOUT=false
export SMTV_MANAGER_ID=your-name
export SMTV_HOST=smtv.aluc.io
```

## 종속성 설치 및 서버 실행

```sh
$ yarn
$ yarn dev
```

### 테스트 데이터를 위해 nginx 서버 실행
`SMTV_CLONE_REPO_URL` 값으로 [SMTV 예제 git 저장소][smtv_example] 를 사용한다면
예제 비디오와 이미지들을 가지고 있는 nginx docker image 를 사용 할 수 있다.

```sh
$ docker run --rm -d -p8082:80 alucio/show-me-the-video-example
```

## Font
- https://google-webfonts-helper.herokuapp.com

## 기여하기
모든 pull request 를 환영합니다.

1. 이 저장소 Fork (https://github.com/aluc-io/gitlab-runner-with-ecr)
1. 새로운 브랜치 생성. 예:
    - git checkout -b feat/my-new-feature
    - git checkout -b fix/some-bug
    - git checkout -b docs/fix-typo
1. 종속성 설치 및 개발 서버 실행
1. 코드 작성 및 커밋
1. Fork 된 저장소에 push
1. 이 저장소의 마스터 브래치로 Pull Request 생성

## License
Released under The MIT License.

[smtv_example]: https://github.com/aluc-io/show-me-the-video-example
