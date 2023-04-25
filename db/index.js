const { MongoClient } = require('mongodb')

const OPTIONS = {
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'movie_app',
}

function connect() {
    try {
        const client = new MongoClient(OPTIONS.DB_URI)
        const db = client.db(OPTIONS.DB_NAME)

        return db
    } catch (err) {
        throw err
    }
}

module.exports = {
    connect,
}
