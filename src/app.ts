import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import GlobalErrorHandler from './app/middleware/globalErrorHandler'
import userRouter from './app/modules/users/route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routes
app.use('/api/v1/user',userRouter)


app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'auth service for university management' })
})

app.use(GlobalErrorHandler)

export default app
