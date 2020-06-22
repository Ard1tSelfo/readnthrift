const express = require('express')

const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')

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


app.listen(port, () => {
    console.log(`Server running on port ${port}`) 
}) 
