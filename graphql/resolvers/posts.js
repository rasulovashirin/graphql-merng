const { rows, row } = require("../../database/postgres")

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                return await rows(`select * from posts`)
            } catch (error) {
                throw error
            }
        },
        getPost: async(_, { postId }) => {
            try {
                const post = await row(`select * from posts where post_id = $1`, postId)
                if(post) {
                    return post
                }
                else {
                    throw new Error('Post not found')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}
