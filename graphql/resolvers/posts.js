const { rows, row } = require("../../database/postgres")
const checkAuth = require("../../util/check-auth")

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
    },
    Mutation: {
        createPost: async (_, { body }, context) => {
            const user = checkAuth(context)

            return await row(`insert into posts(user_id, post_body) values ($1, $2) returning *`, user.user_id, body)
        }
    }
}
