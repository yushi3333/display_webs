import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Review = ({productId})=>{
    const [reviews, setReview] = useState([]);

    const fetchReview = async() =>{
        try{
            const response = await axios.get(`http://localhost:3002/api/reviews/${productId}`);
            setReview(response.data)

        }catch(err){
            console.error('Error fetching reviews:', err);

        }
    } 

    useEffect(()=>{
        fetchReview();
    }, [productId])

    return (
        <div>
        <h3>Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((review, index) => (
            <div key={index}>
            <strong>{review.username}</strong> - {review.rating} Stars
            <p>{review.comment}</p>
            <small>{new Date(review.timestamp).toLocaleString()}</small>
            </div>
        ))}
        </div>
    )
}
export default Review;