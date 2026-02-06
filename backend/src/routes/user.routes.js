import express from 'express'
import {loginUser, logoutUser, registerUser, UpdateProfile} from "../controllers/user.controller.js"
import { isAuthenticated } from '../middleware/isAuthenticated.js'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.patch('/update/profile',isAuthenticated,UpdateProfile)
router.get('/logout',logoutUser)




export default router