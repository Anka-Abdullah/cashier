const productModels = require('../models/products')
const fs = require('fs');

module.exports = {
    getProductById: (req, res) => {
        const id = req.params.id
        productModels.getProductById(id).then((result) => {
            res.json(result)
            console.log(result[0].image)
        }).catch((err) => {
            console.log(err)
            res.send('data not found');
        })
    },
    getAllProducts: async(req, res) => {
        console.log(`status user adalah ${req.status}`)
        const search = req.query.search
        const page = req.query.page || 1
        const sort = req.query.sort
        const resultData = await productModels.countProducts()
        const totalData = resultData[0].totalData
        productModels.getAllProducts(search, page, sort).then((result) => {
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
    updateProduct: (req, res) => {
        const id = req.params.id
        console.log(req.file)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const { name, category, price } = req.body
        const data = {
            name,
            category,
            date: new Date().toLocaleDateString('en-US', options),
            price,
            image: 'http://localhost:4040/uploads/' + req.file.filename
        }
        productModels.getProductById(id).then((result) => {
            console.log(result[0].image)
            const str = result[0].image
            const array = str.split('/')
            const photo = array[array.length - 1]
            console.log(photo)
            fs.unlink('./uploads/' + photo, function(err) {
                if (err) throw err;
            });
        })
        productModels.updateProduct(id, data).then(() => {
            res.send('data berhasil ditubah');
        }).catch((err) => {
            console.log(err)
        })
    },
    insertProduct: (req, res) => {
        console.log(req.file)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const { name, category, price } = req.body
        const data = {
            name,
            category,
            date: new Date().toLocaleDateString('en-US', options),
            price,
            image: 'http://localhost:4040/uploads/' + req.file.filename
        }
        productModels.insertProduct(data).then(() => {
            res.send('data berhasil ditambahkan');
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteProduct: (req, res) => {
        const id = req.params.id
        productModels.getProductById(id).then((result) => {
            console.log(result[0].image)
            const str = result[0].image
            const array = str.split('/')
            const photo = array[array.length - 1]
            console.log(photo)
            fs.unlink('./uploads/' + photo, function(err) {
                if (err) throw err;
            });
        })
        productModels.deleteProduct(id).then(() => {
            res.send(`data  id: ${id} berhasil dihapus`);
        }).catch((err) => {
            console.log(err)
        })
    }
}