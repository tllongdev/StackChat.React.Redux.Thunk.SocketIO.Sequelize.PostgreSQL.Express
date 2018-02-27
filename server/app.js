const path = require('path')
const express = require('express')
const app = express()
module.exports = app

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api', require('./api'))

// sends index.html
app.use('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// Better add some error handling middleware too...
