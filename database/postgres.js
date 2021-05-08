const { Pool } = require("pg")

const { PSQLDB } = require("./config.js")

const pool = new Pool(PSQLDB)

const rows = async (SQL, ...params) => {
    const client = await pool.connect()

    try {
        const { rows } = await client.query(SQL, params)
        return rows

    } catch (error) {
        throw error
    }finally {
        client.release()
    }
}

module.exports.rows = rows