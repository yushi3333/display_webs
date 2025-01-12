import React from 'react'

import CardGroup from '../card/CardGroup'
const Dell = ({dells, addToCart}) => {
  return (
    <CardGroup products={dells} addToCart = {addToCart}/>
  )
}



export default Dell