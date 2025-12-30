const {Router} = require('express');
const { getAllUsers, getUserById, getUserByEmail,
    updateUser, updatePassword, updateEmail, 
    deleteUser,inactivateUser, activateUser, verifyUser } = require('../Controller/userController');
const { verify } = require('jsonwebtoken');


const router = Router();

router.get('/getAllUsers' , getAllUsers);
router.get('/getUserById/:id' , getUserById);
router.get('/getUserByEmail/:email' , getUserByEmail);

router.put('/updateUser/:id' , updateUser);

router.put('/updatePassword/:email' , updatePassword);
router.put('/updateEmail/:id' , updateEmail);

router.delete('/deleteUser/:id' ,deleteUser);
router.put('/inactivateUser/:id' ,inactivateUser);
router.put('/activateUser/:id' ,activateUser);
router.put('/verifyUser' ,verifyUser);

module.exports = router;