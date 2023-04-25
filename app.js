const express = require('express')
const cors = require('cors')
const app = express()

const { connect } = require('./db')
const routes = require('./routes/')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(function (req, res, next) {
    req.db = connect()
    next()
})

app.use(routes)
app.use(errorHandler)

module.exports = app
