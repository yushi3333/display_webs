const express = require('express');
const { createReviews } = require('../controllers/reviewController.js');
const router = express.Router();

router.post('/:productId', createReviews);

module.exports = router;
