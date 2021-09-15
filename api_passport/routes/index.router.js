const router = require('express').Router();
const {login: signIn, register: signUp, signOut} = require('../controllers/auth.controller')
const {getUserById} = require('../controllers/user.controller')
const {getUserProfile} = require('../controllers/profile.controller')

router.post('/auth/sign-up', signUp)
router.post('/auth/sign-in', signIn)
router.post('/auth/sign-out', signOut)

/**
 * USER ROUTES: /api/users
 */
router.param("userId", getUserById);
router.get("/users/profile/:userId", getUserProfile); //

module.exports = router;
