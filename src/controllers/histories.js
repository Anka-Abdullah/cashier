const historyModels = require('../models/histories')

module.exports = {
    getHistoryById: (req, res) => {
        const id = req.params.id
        historyModels.getHistoryById(id).then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err)
            res.send('data not found');
        })
    },
    getAllHistories: async(req, res) => {
        const search = req.query.search
        const page = req.query.page || 1
        const resultData = await historyModels.countHistories()
        const totalData = resultData[0].totalData
        historyModels.getAllHistories(search, page).then((result) => {
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
    updateHistory: (req, res) => {
        const id = req.params.id
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const { invoices, cashier, orders, amount } = req.body
        const data = {
            invoices,
            cashier,
            date: new Date().toLocaleDateString('en-US', options),
            orders,
            amount
        }
        historyModels.updateHistory(id, data).then(() => {
            res.send('data berhasil diubah');
        }).catch((err) => {
            console.log(err)
        })
    },
    insertHistory: (req, res) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const { invoices, cashier, orders, amount } = req.body
        const data = {
            invoices,
            cashier,
            date: new Date().toLocaleDateString('en-US', options),
            orders,
            amount
        }
        historyModels.insertHistory(data).then(() => {
            res.send('data berhasil ditambahkan');
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteHistory: (req, res) => {
        const id = req.params.id
        historyModels.deleteHistory(id).then(() => {
            res.send(`data  id: ${id} berhasil dihapus`);
        }).catch((err) => {
            console.log(err)
        })
    }
}