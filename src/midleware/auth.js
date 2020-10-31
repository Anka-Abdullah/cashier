const jwt = require('jsonwebtoken');

module.exports = {
    verifyAcces: (req, res, next) => {
        let token = req.headers.authorization
        token = token.split(" ")[1]
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.send('Invalid Token');
            req.status = decoded.status
            console.log(decoded)
            next()

        });
    }
}