const userModels = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

module.exports = {
    getAllUsers: async(req, res) => {
        const search = req.query.search
        const page = req.query.page || 1
        const resultData = await userModels.countUsers()
        const totalData = resultData[0].totalData
        userModels.getAllUsers(search, page).then((result) => {
            const dataPerPage = result.length
            res.json({
                totalData,
                dataPerPage: dataPerPage,
                page: page,
                result
            })
        }).catch((err) => {
            console.log(err)
        })
    },
    updateUser: (req, res) => {
        const id = req.params.id
        const { name, email, password } = req.body
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const data = {
            name,
            email,
            status: 'user',
            password,
            date: new Date().toLocaleDateString('en-US', options)
        }
        userModels.updateUser(id, data).then(() => {
            res.send('data berhasil diubah');
        }).catch((err) => {
            console.log(err)
        })
    },
    login: (req, res) => {
        const { email, password } = req.body
        userModels.getUserByEmail(email).then((result) => {
            if (result.length < 1) return res.send('email not found');
            const user = result[0]
            bcrypt.compare(password, user.password).then((resCompare) => {
                if (!resCompare) return res.send('Invalid Password!!');
                const payload = {
                    email: user.email,
                    status: user.status
                }
                jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
                    user.token = token
                    delete user.password
                    delete user.id
                    res.json(user)
                });
            });
        }).catch((err) => {
            console.log(err)
        })
    },
    register: async(req, res) => {
        const { name, email, password } = req.body
        await userModels.getUserByEmail(email).then((result) => {
            if (result.length > 0) { res.send('email sudah digunakan'); } else {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const data = {
                    name,
                    email,
                    status: 'user',
                    password,
                    date: new Date().toLocaleDateString('en-US', options)
                }
                var bcrypt = require('bcryptjs');
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        data.password = hash
                        userModels.register(data).then(() => {
                            res.send('data berhasil ditambahkan');
                        }).catch((err) => {
                            console.log(err)
                        })
                    });
                });
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id
        userModels.deleteUser(id).then(() => {
            res.send(`data  id: ${id} berhasil dihapus`);
        }).catch((err) => {
            console.log(err)
        })
    }
}