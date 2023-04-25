const { object, string } = require('yup')

const movieSchema = object({
    title: string('Title must be a string').required('Title is required'),
    description: string('Description must be a string'),
})

module.exports = { movieSchema }
