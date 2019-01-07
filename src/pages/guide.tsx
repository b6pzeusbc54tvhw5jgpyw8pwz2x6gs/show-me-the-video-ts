import * as React from 'react'
import { withRouter, SingletonRouter } from 'next/router'
import getConfig from 'next/config'
import { Card as BPCard } from '@blueprintjs/core'
import styled, { createGlobalStyle } from 'styled-components'
import { space, width, fontSize, color } from 'styled-system'

import { getGuideInfo } from '../core'
import { IGuideInfo, IStatelessPage } from 'global';
const { publicRuntimeConfig } = getConfig()

const { SMTV_URL, SMTV_PUBLIC_REPO_URL, SMTV_MANAGER_ID } = publicRuntimeConfig

interface GuideProps {
  guideInfo: IGuideInfo
  router: SingletonRouter
}

const Page = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Card = styled(BPCard)`
  background-color: blue;
  color: white;
`

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
  }
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    vertical-align: baseline;
    margin: 0px;
    padding: 0px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    font: inherit;
  }
`

const Guide: IStatelessPage<GuideProps> = (props) => {
  const { router } = props
  const { id, videoUrl, text, thumbnailUrl, filename } = props.guideInfo

  const issueTitle = encodeURIComponent(`
  영상 가이드(${id}) 관련 문의/제안 드립니다
  `.trim())
    const issueDescription = encodeURIComponent(`
  # 질문 있어요 / 제안 합니다
  
  - 보고 있던 동영상 주소: ${SMTV_URL}/${router.asPath}
  - 급함 정도: 매우 급함 / 급함 / 보통 / 안급함 / 매우 안급함
  - 내용:
  
  \`\`\`
  <여기에 작성해주세요>
  \`\`\`
  
  /assign @${SMTV_MANAGER_ID}
  `.trim())
  return (
    <Page>
      <GlobalStyle />
      {id}
      <Card>card</Card>
    </Page>
  )
}

Guide.getInitialProps = async ({ req }) => {
  const guideId = req.params.guideId
  const guideInfo = await getGuideInfo(guideId)
  console.log('guideInfo: ' + guideInfo)
  return { guideInfo }
}
export default withRouter(Guide)
