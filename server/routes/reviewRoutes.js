const express = require('express');
const { createReviews,getReview } = require('../controllers/reviewController.js');
const router = express.Router();

router.post('/:productId', createReviews);
router.get('/:productId', getReview);

module.exports = router;
