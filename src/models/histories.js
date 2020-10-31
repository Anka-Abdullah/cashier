const { actionQuery } = require('../helper/helper')

module.exports = {
    getHistoryById: (id) => {
        return actionQuery(`SELECT * FROM history WHERE id = ?`, id)
    },
    getAllHistories: (search, page) => {
        if (search == null) {
            return actionQuery(`SELECT * FROM history LIMIT 2 OFFSET ${(page-1)*2}`)
        } else {
            return actionQuery(`SELECT * FROM history WHERE history.invoices LIKE '%${search}%' 
                        OR history.cashier LIKE '%${search}%' OR history.date LIKE '%${search}%' 
                        OR history.orders LIKE '%${search}%' LIMIT 2 OFFSET ${(page-1)*2}`)
        }
    },
    updateHistory: (id, data) => {
        return actionQuery(`UPDATE history SET ? WHERE id = ?`, [data, id])
    },
    insertHistory: (data) => {
        return actionQuery(`INSERT INTO history SET ?`, data)
    },
    deleteHistory: (id) => {
        return actionQuery(`DELETE FROM history WHERE id = ?`, id)
    },
    countHistories: () => {
        return actionQuery(`SELECT COUNT(*) AS totalData FROM history;`)
    }
}