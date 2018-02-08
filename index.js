const express = require('express')
const app = express()
const bodyParser = require('body-parser')

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
    const size = persons.length
    let now = new Date()
    const front = `<p>puhelinluettelossa on ${size} henkilön tiedot</p>` + now
    console.log('nyt', now)
    res.send(front)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const note = persons.find(note => note.id == id)
    if (note) {
        response.json(note)
    }
    else {
        response.status(404).end()
    }
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

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})