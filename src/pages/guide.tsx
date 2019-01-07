import * as React from 'react'
import { withRouter, SingletonRouter } from 'next/router'
import { Card as BPCard } from '@blueprintjs/core'
import styled from 'styled-components'

import { getGuideInfo } from '../core'

interface GuideProps {
  guideInfo: any
  router: SingletonRouter
}

const Card = styled(BPCard)`
  background-color: blue;
  color: white;
`

const Guide: IStatelessPage<GuideProps> = () => {
  return (
    <Card>grid</Card>
  )
}

Guide.getInitialProps = async ({ req }) => {
  const guideId = req ? req.params!.guideId : '11'
  const guideInfo = await getGuideInfo(guideId)
  return { guideInfo }
}
export default withRouter(Guide)
