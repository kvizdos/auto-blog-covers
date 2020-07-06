// Install body-parser and Express
const express = require('express')
const app = express()
const socialCardHandler = require('./social-cards/social-cards');
const socialCards = new socialCardHandler();

app.get('/', (req, res) => res.json('Hello World!'))

app.use('/social-cards', socialCards.getRoutes())

app.listen(3030, () => console.log('Example app listening on port 3030!'))