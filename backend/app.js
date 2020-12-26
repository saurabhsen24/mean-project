const path = require('path')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const postsRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const app = express()

mongoose.connect('mongodb://localhost/mean_stack')
    .then(() => console.log('connected'))
    .catch(() => console.log('Error in connection'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/images', express.static(path.join('backend/images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS')
  next()
})

app.use("/api/posts",postsRoutes)
app.use('/api/user', userRoutes)

module.exports = app
