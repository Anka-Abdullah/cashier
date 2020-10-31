const { actionQuery } = require('../helper/helper')
const sql = `SELECT product.id, product.name, category.category, product.price, product.date, product.image FROM category INNER JOIN product ON product.category=category.id `


module.exports = {
    getProductById: (id) => {
        return actionQuery(`${sql} WHERE product.id = ?`, id)
    },
    getAllProducts: (search, page, sort) => {
        const pagination = `LIMIT 2 OFFSET ${(page-1)*9}`
        if (sort != null) {
            switch (sort) {
                case 'name':
                    return actionQuery(`${sql} ORDER BY name ASC ${pagination}`)
                case 'cheap':
                    return actionQuery(`${sql} ORDER BY price ASC ${pagination}`)
                case 'expensive':
                    return actionQuery(`${sql} ORDER BY price DESC ${pagination}`)
                default:
                    return res.send('sort error');
            }
        } else if (search != null) {
            return actionQuery(`${sql} WHERE product.name LIKE '%${search}%' OR category.category LIKE '%${search}%' ${pagination}`)
        } else {
            return actionQuery(`${sql} ${pagination}`)
        }
    },
    updateProduct: (id, data) => {
        return actionQuery(`UPDATE product SET ? WHERE id = ?`, [data, id])
    },
    insertProduct: (data) => {
        return actionQuery(`INSERT INTO product SET ?`, data)
    },
    deleteProduct: (id) => {
        return actionQuery(`DELETE FROM product WHERE id = ?`, id)
    },
    countProducts: () => {
        return actionQuery(`SELECT COUNT(*) AS totalData FROM Product;`)
    }
}