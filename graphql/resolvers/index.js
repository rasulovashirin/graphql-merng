const postsResolvers = require("./posts")
const usersResolvers = require("./users")
const commentsResolvers = require("./comments")
const likesResolvers = require("./likes")

const { rows } = require('../../database/postgres')

module.exports = {
    Post : {
        comments: async (post) => {
            return await rows(`select * from comments where post_id = $1`, post.post_id)
        },
        likes: async (post) => {
            return await rows(`select * from likes where post_id = $1`, post.post_id)
        }
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    }
}