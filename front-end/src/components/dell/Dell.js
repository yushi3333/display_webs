import React from 'react'
import DellCardGroup from '../card/dellCardGroup'
const Dell = ({dells, addToCart}) => {
  return (
    <DellCardGroup dells={dells} addToCart = {addToCart}/>
  )
}

export default Dell