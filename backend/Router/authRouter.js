const {Router} = require('express');
const { register,login,logout } = require('../Controller/authController');

const router = Router();

router.post('/register', register)
router.post('/login',  login)
router.post('/logout',  logout)

module.exports = router;    

