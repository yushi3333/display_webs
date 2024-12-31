import React from 'react'

import CardGroup from '../card/CardGroup'
const Asus = ({asus, addToCart}) => {
  return (
    <CardGroup products={asus} addToCart = {addToCart}/>
  )
}

export default Asus
