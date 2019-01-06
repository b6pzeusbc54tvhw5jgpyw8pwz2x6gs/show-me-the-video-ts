import * as React from 'react'
import { withRouter, SingletonRouter } from 'next/router'
import { Card as BPCard } from '@blueprintjs/core'
import styled from 'styled-components'

const Card = styled(BPCard)`
  background-color: blue;
  color: white;
`;
// import { appContext } from '../context'

const Guide = () => {
  return (
    <Card>grid</Card>
  )
}

export default withRouter(Guide)
