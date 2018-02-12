const mongoose = require('mongoose')
const Schema = mongoose.Schema;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const url = process.env.MONGODB_URI

mongoose.connect(url)
const schema = new Schema({
    name: String,
    number: String,
    id: String
})
schema.statics.format = function (person) {
    console.log('format')
    const formatted = {
        name:person.name || "",
        number: person.number,
        id: person._id
    }
    return formatted
}

const Person = mongoose.model('Person', schema)

module.exports = Person