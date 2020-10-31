const connection = require('../config/db')

module.exports = {
    actionQuery: (...argument) => {
        return new Promise((resolve, reject) => {
            connection.query(...argument, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}