import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ReviewForm  = ({productId})=>{
    const [rating, setRating] = useState(0);
    const [comment, setComments] = useState("");
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const username = localStorage.getItem('username');
            await axios.post(`http://localhost:3002/api/reviews/${productId}`, {username, rating, comment})
            setRating(0);
            setComments('');
            

        }catch(err){
            console.log('Error submitting review:', err);

        }

    }
    return(
        <form onSubmit={handleSubmit} >

            <label>Rating:</label>
            <Form.Select aria-label="Rating" value={rating} onChange={(e)=>setRating(e.target.value)}  required>
                <option>Select Rating </option>
                <option value="1">1 - poor</option>
                <option value="2">2 - fair</option>
                <option value="3">3 - good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>

            </Form.Select>
            {/* <select value={rating} onChange={(e) => setRating(e.target.value)} required>
                <option value="">Select Rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
            </select> */}






            <InputGroup>
                <InputGroup.Text>Comment</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" value={comment} onChange={(e)=>setComments(e.target.value)} required />
            </InputGroup>



            {/* <label>Comment:</label>
            <textarea value={comment} onChange={(e) => setComments(e.target.value)} required /> */}

            <button type="submit">Submit Review</button>


        </form>

    )

}
export default ReviewForm;