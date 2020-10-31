const { actionQuery } = require('../helper/helper')

module.exports = {
    getUserByEmail: (email) => {
        return actionQuery(`SELECT * FROM user WHERE email = ?`, email)
    },
    getAllUsers: (search) => {
        if (search == null) {
            return actionQuery(`SELECT * FROM user`)
        } else {
            return actionQuery(`SELECT * FROM user WHERE user.name LIKE '%${search}%' 
                        OR user.email LIKE '%${search}%' OR user.status LIKE '%${search}%'`)
        }
    },
    updateUser: (id, data) => {
        return actionQuery(`UPDATE User SET ? WHERE id = ?`, [data, id])
    },
    register: (data) => {
        return actionQuery(`INSERT INTO User SET ?`, data)
    },
    deleteUser: (id) => {
        return actionQuery(`DELETE FROM User WHERE id = ?`, id)
    },
    countUsers: () => {
        return actionQuery(`SELECT COUNT(*) AS totalData FROM user;`)
    }
}