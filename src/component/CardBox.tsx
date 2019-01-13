import { useContext } from 'react'
import * as React from 'react'
import styled from 'styled-components'

import Card from './Card'
import { AppContext } from '../context'
import { NextStatelessComponent } from 'next';

const StyledCardBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1.05rem;
  min-height: 640px;
`

const CardBox:NextStatelessComponent<React.Props<{}>> = () => {
  const { videoInfoArr } = useContext(AppContext)
  return (
    <StyledCardBox>
      {videoInfoArr.map( (info,i) => <Card key={i} {...info} />)}
    </StyledCardBox>
  )
}

export default CardBox
