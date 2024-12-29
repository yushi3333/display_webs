import React from 'react'
import CardGroup from '../card/CardGroup'
import { Card } from '@mui/material'

const Apple = ({apples, addToCart} ) => {

  
  return (
    <CardGroup products={apples} addToCart={addToCart}/>
  )
}

export default Apple