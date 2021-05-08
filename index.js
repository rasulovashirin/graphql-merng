const { ApolloServer, gql } = require("apollo-server")
const { rows } = require("./database/postgres")


const typeDefs = gql`
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

const resolvers = {
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

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({port : 5000}).then(res => console.log(`Server running at ${res.url}`))