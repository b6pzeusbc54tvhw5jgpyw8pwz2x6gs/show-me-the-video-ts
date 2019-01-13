import * as React from 'react'

import CardBox from '../component/CardBox'
import Footer from '../component/Footer'
import Header from '../component/Header'
import { Page } from '../component/styled'


const Index = () => {
  return (
    <Page>
      <Header />
      <CardBox />
      <Footer />
    </Page>
  )
}

export default Index