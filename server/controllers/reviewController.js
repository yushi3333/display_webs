const {getDb} = require('../utils/db')
const {ObjectId} = require('mongodb')


//insert review
const createReviews = async (req, res) => {
  const {productId} = req.params;
  console.log(`creating review with ID: ${id}`);
  const {username, rating, comment} = req.body;
  if (!username || ! rating || !comment){
    return res.status(400).json({message: "all fields are required"})
  }
  try{
    
    const db = getDb();
    const review = {
      productId: new ObjectId(productId),
      username, 
      rating: parseInt(rating),
      comment,
      timestampe: new Date()
    }
    const result = await db.collection('Reviews').insertOne(review);
    res.status(201).json({message: "Review added successfully", review});
  }catch(error){
    console.error('Error adding review:', error);
    res.status(500).json({message: "Internal server error"})

  }

}

// Use module.exports to export
module.exports = {
  createReviews,
};
