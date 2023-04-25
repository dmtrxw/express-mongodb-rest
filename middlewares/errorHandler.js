function errorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.status(400).json({
            message: 'Validation error occured',
            errors: err.errors,
        })
    } else if (err.name === 'NotFound') {
        res.status(404).json({
            message: `${err.entity} not found`,
        })
    } else {
        console.log({ errName: err.name, err: err })
        res.status(500).json({
            message: 'Internal server error',
        })
    }
}

module.exports = errorHandler
