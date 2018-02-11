const mongoose = require('mongoose')
const url = 'mongodb://fullstack:***@ds227858.mlab.com:27858/fullstack_phonebook'

mongoose.connect(url)

let comname = ''
let comnumber = ''

process.argv.forEach((val, index) => {
    if (index === 2) {
        comname = val
    }
    if (index === 3) {
        comnumber = val
    }
});

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

const person = new Person({
    name: comname,
    number: comnumber
})

if (comname === '') {
    Person
        .find({})
        .then(result => {
            console.log('puhelinluettelo:')
            result.forEach(person => {
                console.log(person.name, person.number)
            })
            mongoose.connection.close()
        })
} else {

    person
        .save()
        .then(response => {
            console.log('lisätään henkilö ', person.name, 'numero ', person.number, 'luetteloon')
            mongoose.connection.close()
        })
}


