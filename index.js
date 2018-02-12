const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}
morgan.token('type', (req,res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :type :status :res[content-length] - :response-time ms'))


app.use(cors())

app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    }
]

app.use(bodyParser.json())



app.get('/info', (req, res) => {
    Person.count({}, function (err, count) {
        console.log(count)
        let now = new Date()
        const front = `<p>puhelinluettelossa on ${count} henkilön tiedot</p>` + now
        console.log('nyt', now)
        res.send(front)
    })


})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(formatPerson))
        })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(formatPerson(person))
            } else {
                response.status(404).end()
            }

        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000))
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body.name)
    console.log(body.number)
    if (body.name === undefined || body.name === "") {
        return response.status(400).json({ error: 'name missing' })
    }
    if (body.number === undefined || body.number === "") {
        return response.status(400).json({ error: 'number missing' })
    }
    if (persons.filter(person => person.name === body.name).length !== 0) {
        return response.status(400).json({ error: 'name already in the list' })
    }

    
    const person = new Person({
        name: body.name,
        number: body.number
        /*
    id: generateId()
    */
    })

    
    person
        .save()
        .then(formatPerson)
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => {
            console.log(error)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            response.status(400).send({ error: 'malformatted id' })
        })
})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }
    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(formatPerson(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})