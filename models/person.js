const mongoose = require('mongoose')
const url = 'mongodb://fullstack:***@ds227858.mlab.com:27858/fullstack_phonebook'

mongoose.connect(url)

const Person = mongoose.model('Person', {

    name: String,
    number: String
})

module.exports = Person