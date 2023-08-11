const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const app = express()



//connect db
mongoose.set('strictQuery',false)
async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB has been connected')
  }
  
  connectDB()

  // routes
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
  app.use('/auth', authController)


//connect server
app.listen(process.env.PORT, () =>{console.log('Server has been connected')})