import React from 'react'
import { Component } from 'react'
import TopPage from './components/TopPage'
import BottomPage from './components/BottomPage'
import MenuPage from './components/MenuPage'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <Container>
        <TopPage/>
        <MenuPage/>
        <BottomPage/>
    </Container>
  )
}

export default App