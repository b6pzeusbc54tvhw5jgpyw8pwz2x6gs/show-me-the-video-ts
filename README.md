# SMTV(show-me-the-video)
SMTV is the project that generates a video clip web page similar to YouTube by
parsing the markdown file including the video contents. Use github, gitlab, or
locally accessible peer store as source data to create this web page.

Create a directory `show-me-the-video` in the repository root path and write
markdown files(`*.md`) in this directory as shown in the following rules then
you can get the web site similar to YouTube. Refer [the example git
repository][smtv_example]!

# Guide For User

## Markdown rules

```markdown
[videoUrl]: http://example.com/video1.mkv
[thumbnailUrl]: http://example.com/image.png
[tags]: windows,linux
[prev]: ./previousMarkdownContent.md
[next]: ./nextMarkdownContent.md
[duration]: 2:30
[author]: alfreduc
[createTime]: 20181127
[updateTime]: 20181127

# Title

## Sub title (optional)

[![video][thumbnailUrl]][videoUrl]

Freely write video descriptions, related link information, and text content
as Markdown format
```

`[![video][thumbnailUrl]][videoUrl]` is part to be rendered to the video player
part. Without this part, the video player will not appear.

## Properties

| property     | isRequired | description                        |
|----------    |----------- |----------------------------------- |
| videoUrl     |   required | video url                          |
| thumbnailUrl |   optional | thumbnail of video                 |
| tags         |   optional | `,` seperated tag                  |
| prev         |   optional | Specify the previous relevant file |
| next         |   optional | Specify the next relevant file     |
| duration     |   optional | video content's duration time      |
| author       |   optional | uploader                           |
| createTime   |   optional | upload date                        |
| updateTime   |   optional | last update date                   |

# Guide for development

## Set the environment variables

```sh
export SMTV_CLONE_REPO_URL=https://github.com/aluc-io/show-me-the-video-example.git
export SMTV_PUBLIC_REPO_URL=https://github.com/aluc-io/show-me-the-video-example
export SMTV_TITLE="My Video Clip"
export SMTV_REPO_TYPE=GITLAB # GITLAB | GITHUB
export SMTV_SHOW_LAYOUT=false
export SMTV_MANAGER_ID=your-name
export SMTV_HOST=smtv.aluc.io
```

## Install dependencies and Run development server

```sh
$ yarn
$ yarn dev
```

### Run nginx server for test data
If you want to use the [example git repository][smtv_example] as
`SMTV_CLONE_REPO_URL`, you can use nginx web server contains example videos,
images using pre built docker image.

```sh
$ docker run --rm -d -p8082:80 alucio/show-me-the-video-example
```

## Font
- https://google-webfonts-helper.herokuapp.com

## Contributing
All pull requests are welcome.

1. Fork this repository (https://github.com/aluc-io/gitlab-runner-with-ecr)
1. Create your new branch, example:
    - git checkout -b feat/my-new-feature
    - git checkout -b fix/some-bug
    - git checkout -b docs/fix-typo
1. Install denpendendies and run development server
1. Write your code and commit your changes
1. Push to your fork
1. Create a new Pull Request to master branch of this repository

## License
Released under The MIT License.

[smtv_example]: https://github.com/aluc-io/show-me-the-video-example

