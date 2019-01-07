import * as path from "path"
import * as git from 'simple-git/promise'

import to from 'await-to-js'
import { promises } from 'fs'

import { compact, filter, reject as lodashReject, find, findIndex, last } from 'lodash'

import * as marked from 'marked'
import * as md5 from 'md5'
import * as readdirEnhanced from 'readdir-enhanced'
import * as tracer from 'tracer'
import { CONST_DIR_NAME, CONST_GITREPO_PATH } from '../constant'
import { oc } from 'ts-optchain'

function c<T>(exp: () => T) {
  try {
      const val = exp()
      if (val != null) {
          return val
      }
  } catch (err) {
    // logger.debug(err)
  }

  return void 0
}

const fs = promises
const logger = tracer.console()
const { SMTV_CLONE_REPO_URL='' } = process.env

const getPathFromGitRepoUrl = (url: string) => {
  const projectName = last(url.split('/'))!.replace(/\.git$/,'')
  return `${CONST_GITREPO_PATH}/${projectName}.${md5(url)}`
}

const getRepo = async (repoUrl: string, dirPath?: string) => {
  dirPath = dirPath || getPathFromGitRepoUrl(repoUrl)
  const dotGitPath = path.resolve(dirPath, '.git')

  const [err, stat] = await to(fs.stat(dirPath))
  if (err && err.code !== 'ENOENT') throw err

  // let err2: Error | null
  // let dotGitStat: _fs.Stats | undefined
  const [err2, dotGitStat] = await to(fs.stat(dotGitPath))
  if (err2 && err2.code !== 'ENOENT') throw err

  if (oc(stat)!.isDirectory() && oc(dotGitStat).isDirectory()) {
    // true, true
    const [err3] = await to(git(dirPath).pull())
    if (err3) throw err3
    logger.debug(`success. git pull ${dirPath}`)

  } else if (oc(stat).isDirectory() && !oc(dotGitStat).isDirectory()) {
    // true, false
    const pathArr = readdirEnhanced.sync(dirPath)
    if (pathArr.length > 0 ) throw new Error('NOT_EMPTY_DIRECTORY')

    const [err4] = await to(git().clone(repoUrl, dirPath, ["--depth","1"]))
    if (err4) throw err4
    logger.debug(`success. git clone ${repoUrl} ${dirPath}`)

  } else {
    // false, false
    // false, true (이 경우는 불가능)
    const [err4] = await to(git().clone(repoUrl, dirPath, ["--depth","1"]))
    if (err4) throw err4

    logger.debug(`success. git clone ${repoUrl} ${dirPath}`)
  }

  return dirPath
}

const getVideoGuideHereFileArr = (repoPath: string) => {
  const dirPath = path.resolve(repoPath, CONST_DIR_NAME)
  let fileArr = readdirEnhanced.sync(dirPath)
  fileArr = lodashReject(fileArr, name => name === 'README.md')
  fileArr = filter(fileArr, name => /\.md$/.test(name))
  fileArr = fileArr.map( name => path.resolve( dirPath, name))
  return fileArr
}

const readFile = async (absolutePath: string) => {
  const text = await fs.readFile( absolutePath, 'utf8')
  return { filename: path.basename(absolutePath), text }
}

interface IFilenameText {
  filename: string
  text: string
}

const parseVideoInfo = ({ filename, text }: IFilenameText ) => {
  logger.debug( filename )
  // todotodotodotodo!!!
  const tokenArr = marked.lexer(text)
  const firstHeading: any = find(tokenArr, t => t.type === 'heading' && t.depth === 1) || {}
  const titleIndex = findIndex( tokenArr, firstHeading )
  let subTitle: any = tokenArr[titleIndex+1]
  subTitle = subTitle!.type === 'heading' && subTitle.depth === 2
    ? subTitle.text : ''

  const isDraft = c(() => tokenArr.links.draft.href) === 'true'
  if (isDraft) return null

  return {
    title: firstHeading!.text || '[제목없음]',
    subTitle: subTitle,
    videoUrl: c(() => tokenArr.links.videourl!.href),
    thumbnailUrl: c(() => tokenArr.links.thumbnailurl!.href),
    tagArr: c(() => tokenArr.links.tags.href.split(',')) || [],
    prevGuideId: c(() => tokenArr.links.prev.href),
    nextGuideId: c(() => tokenArr.links.next.href),
    author: c(() => tokenArr.links.author.href),
    date: c(() => tokenArr.links.date.href),
    duration: c(() => tokenArr.links.duration.href),
    id: md5(filename).substr(0,8),
    filename: filename,
    text: text,
  }
}

export const getVideoInfoArr = async (url: string) => {
  url = url || SMTV_CLONE_REPO_URL
  const repoPath = getPathFromGitRepoUrl(url)
  const [err] = await to( getRepo(url,repoPath))
  if (err ) throw err

  const fileArr = getVideoGuideHereFileArr(repoPath)
  const promiseArr = fileArr.map(readFile)
  const filenameTextArr = await Promise.all(promiseArr)
  const videoInfoArr = compact(filenameTextArr.map(parseVideoInfo))

  return videoInfoArr
}

export const getGuideInfo = async (id: string, url: string) => {
  url = url || SMTV_CLONE_REPO_URL
  const guideInfoArr = await getVideoInfoArr(url)
  const info = find(guideInfoArr, { id })

  return info
}

export default {
  getGuideInfo,
  getVideoInfoArr,
}

