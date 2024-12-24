import React from 'react'
import CardGroup from '../card/CardGroup'
import { Card } from '@mui/material'

const Apple = ({apples, addToCart} ) => {

  
  return (
    <CardGroup apples={apples} addToCart={addToCart}/>
  )
}

export default Apple