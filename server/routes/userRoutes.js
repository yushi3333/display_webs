const express = require('express');
const { registerUser, loginUser, getAllUsers, getUser, deleteUser } = require('../controllers/userController');

console.log('registerUser:', registerUser);
console.log('loginUser:', loginUser);

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/allUsers", getAllUsers);
router.get('/:id',getUser);
router.delete('/:id',deleteUser);

module.exports = router;
