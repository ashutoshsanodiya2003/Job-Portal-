import express from 'express'
import {loginUser, logoutUser, registerUser, UpdateProfile} from "../controllers/user.controller.js"
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'

const router = express.Router()

router.post('/register',singleUpload,registerUser)
router.post('/login',loginUser)
router.patch('/update/profile',isAuthenticated,UpdateProfile)
router.get('/logout',logoutUser)




export default router