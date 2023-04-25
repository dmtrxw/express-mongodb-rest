const { ObjectId } = require('mongodb')
const { movieSchema } = require('../lib/validators')

class MovieController {
    static async get(req, res, next) {
        const { db } = req

        try {
            const movies = await db.collection('movies').find().toArray()
            res.json(movies)
        } catch (err) {
            next(err)
        }
    }

    static async findById(req, res, next) {
        const { db } = req
        try {
            const id = req.params.id
            const isValidId = ObjectId.isValid(id)

            if (!isValidId) {
                throw { name: 'NotFound', entity: 'Movie' }
            }

            const query = { _id: new ObjectId(id) }
            const movie = await db.collection('movies').findOne(query)

            if (!movie) {
                throw { name: 'NotFound', entity: 'Movie' }
            }

            return movie
        } catch (err) {
            next(err)
        }
    }

    static async getById(req, res, next) {
        try {
            const movie = await MovieController.findById(req, res, next)

            res.json(movie)
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        const { db } = req
        try {
            const { title, description } = req.body
            const payload = await movieSchema.validate({ title, description })
            const movie = await db.collection('movies').insertOne(payload)

            const newlyCreatedMovie = { _id: movie.insertedId, ...payload }
            res.status(201).json(newlyCreatedMovie)
        } catch (err) {
            next(err)
        }
    }

    static async destroy(req, res, next) {
        const { db } = req
        try {
            const movie = await MovieController.findById(req, res, next)

            await db
                .collection('movies')
                .deleteOne({ _id: new ObjectId(movie._id) })

            res.json({ message: 'Movie deleted' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MovieController
