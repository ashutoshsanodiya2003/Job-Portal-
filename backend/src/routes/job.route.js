import express from 'express'
import {isAuthenticated} from '../middleware/isAuthenticated.js'
import { getAdminJob, getAllJobs, getJobById, jobPost } from '../controllers/job.controller.js'


const router = express.Router()

router.post('/post', isAuthenticated,jobPost)
router.get('/get', isAuthenticated,getAllJobs)
router.get('/getadminjobs', isAuthenticated,getAdminJob)
router.get('/get/:id', isAuthenticated,getJobById)



export default router