const express = require('express')
const router = express.Router()

const MovieController = require('../controllers/movie')

router.get('/', function (req, res, next) {
    res.send('It works')
})

router.get('/movies', MovieController.get)
router.get('/movies/:id', MovieController.getById)
router.post('/movies', MovieController.create)
router.delete('/movies/:id', MovieController.destroy)

module.exports = router
