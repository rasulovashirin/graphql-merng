const { rows } = require("../../database/postgres")

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                return await rows(`select * from posts`)
            } catch (error) {
                throw error
            }
        }
    }
}