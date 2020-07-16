const express = require('express')

const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')
const reviewRouter = require('./routers/review')
const bookshelfRouter = require('./routers/bookshelf')
const offerRouter = require('./routers/offer')
const reccomendationsRouter = require('./routers/recommenderAlgorithms');

const cors = require('cors')
const port = process.env.PORT
require('./db/db')

const app = express()
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(bookRouter)
app.use(reviewRouter)
app.use(bookshelfRouter)
app.use(offerRouter)
app.use(reccomendationsRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`) 
}) 
