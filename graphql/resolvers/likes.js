const { UserInputError } = require('apollo-server')

const { row } = require("../../database/postgres")
const checkAuth = require("../../util/check-auth")

module.exports = {
    Mutation: {
        likePost: async (_, { postId }, context) => {
            const { user_id } = checkAuth(context)

            const post = await row(`select * from posts where post_id = $1`, postId)
            if(post) {
                const like = await row(`select * from likes where user_id = $1 and post_id = $2`, user_id, postId)
                if(like) {
                    return await row(`delete from likes where like_id = $1 returning *`, like.like_id)
                }
                else {
                    return await row(`insert into likes(user_id, post_id) values ($1, $2) returning *`, user_id, postId)
                }
            }
            else {
                throw new UserInputError('Post not found')
            }
        }
    }
}