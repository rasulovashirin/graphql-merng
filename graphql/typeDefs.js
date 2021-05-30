const { gql } = require("apollo-server")

module.exports = gql`
    type Post {
        post_id: ID!
        post_body: String!
        created_at: String!
        user_id: Int!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        comment_id: ID!
        user_id: ID!
        comment_body: String!
        post_id: ID!
        created_at: String!
    }

    type Like {
        like_id: ID!
        user_id: ID!
        post_id: ID!
        created_at: String!
    }

    type User {
        user_id: ID!
        username: String!
        user_password: String!
        user_email: String!
        created_at: String!
        token: String!
    }

    input RegisterInput {
        username: String!
        password: String!
        email: String!
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post!]!
        getPost(postId: ID!): Post!
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): Post!
        createComment(postId: ID!, body: String!): Comment!
        deleteComment(postId: ID!, commentId: ID!): Comment!
        likePost(postId: ID!): Like!
    }


`