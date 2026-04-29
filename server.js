require('dotenv').config()
require('./config/database')
const express = require ('express')
const PORT = process.env.PORT || 2000

const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRouter')
const paymentRouter = require('./routes/paymentRouter')

const expressSession = require('express-session')
const {passport} = require('./middlewares/passport')

//  const { Order } = require('@getbrevo/brevo')
const app = express()
app.use(express.json())

app.use(expressSession({
  secret:'michael',
  resave:true,
  saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(userRouter)
app.use(orderRouter)
app.use(paymentRouter)

app.listen(PORT,()=>{
    console.log(`server is running on PORT,${PORT}`)
}) 