import React from 'react'
import ReviewForm from '../review/ReviewForm'
import Review from '../review/Review'

const Details = ({product}) => {

  return (
    
    <div className="productContainer">
        <h3>${product.name}</h3>
        <img src={product.image[0]} alt={product.name} />
        <div className="details">
            <p><strong>Overview:</strong> {product.overview || "No overivew available"}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>

            
        </div>
        <div>
          <ReviewForm productId={product._id}  />
          <h3>Customer Review</h3>
          <Review productId={product._id}/>
        </div>
        
    </div>

  )
}

export default Details