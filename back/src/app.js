import express from 'express'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'
import LoggerMiddleware from './middlewares/logger.js'

const app = express()

app.use(express.json())
app.use(errorHandler)
app.use(LoggerMiddleware)

app.use('/api', routes)

export default app;