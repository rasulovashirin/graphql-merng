const { UserInputError } = require('apollo-server')

const { row } = require("../../database/postgres")
const checkAuth = require("../../util/check-auth")

module.exports = {
    Mutation: {
        createComment : async (_, {postId, body}, context) => {
            const {user_id} = checkAuth(context)

            if(body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                })
            }

            const post = await row(`select * from posts where post_id = $1`, postId)

            if(post) {
                return await row(`insert into comments(user_id, comment_body, post_id) values ($1, $2, $3) returning *`, user_id, body, postId)
            }
            else {
                throw new UserInputError('Post not found')
            }
        }
    }
}