const { gql } = require("apollo-server")

module.exports = gql`
    type Post {
        post_id: ID!,
        post_body: String!
        created_at: String!
        user_id: Int!
    }

    type Query {
        getPosts: [Post!]!
    }
`