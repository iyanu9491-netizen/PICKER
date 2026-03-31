require('dotenv').config()
require('./config/database')
const express = require ('express')
const PORT = process.env.PORT || 2000
const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRouter')
//  const { Order } = require('@getbrevo/brevo')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(orderRouter)

app.listen(PORT,()=>{
    console.log(`server is running on PORT,${PORT}`)
}) 