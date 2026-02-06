import dotenv from 'dotenv'

dotenv.config({})
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import companyRouter from "./routes/company.routes.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from './routes/application.route.js'




const corsOption = {
  origin: 'http://localhost:5173',
  credentials: true
}

const app = express()

app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/company',companyRouter)
app.use('/api/v1/job',jobRouter)
app.use('/api/v1/application',applicationRouter)




export default app
