const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

if (MONGO_URL && !mongoose.connection.readyState) {
  console.log(MONGO_URL)
  try {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('connected')
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  Todo
}
