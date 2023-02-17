
const router = require('express').Router()
const {login,register,getAllUsers} = require('../controllers/auth')

router.post('/login',login)
router.post('/register',register)
router.get('/users',getAllUsers)


module.exports = router

