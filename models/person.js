const mongoose = require('mongoose')
const Schema = mongoose.Schema;

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }

const url = process.env.MONGODB_URI

mongoose.connect(url)
const schema = new Schema({
    name: String,
    number: String
})
schema.statics.format = function () {
    console.log('format')
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}

const Person = mongoose.model('Person', schema)

module.exports = Person