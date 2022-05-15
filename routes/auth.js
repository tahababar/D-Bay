import express from "express"
import {register, login, currentUser, forgotPassword, profileUpdate, findPeople, addFollower, userFollow, userFollowing, removeFollower, userUnfollow, getUser, searchUser} from '../controllers/auth'

const router = express.Router();

import {requireSignin} from "../middlewares";

router.post('/register', register);
router.post('/login', login);
router.get('/current-user', requireSignin, currentUser); //middleware requireSignin added
router.post('/forgot-password',forgotPassword)
router.put('/profile-update', requireSignin, profileUpdate)
router.get('/find-people', requireSignin, findPeople)
router.put("/user-follow", requireSignin, addFollower, userFollow)
router.get('/user-following', requireSignin, userFollowing)
router.put("/user-unfollow", requireSignin, removeFollower, userUnfollow)
router.get("/user/:username", getUser)
router.get("/search-user/:query", searchUser)

module.exports = router;