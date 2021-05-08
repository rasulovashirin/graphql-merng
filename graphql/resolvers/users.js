const jwt = require("jsonwebtoken")

const { rows, row } = require("../../database/postgres")
const { SECRET_KEY } = require("../../config")

module.exports = {
    Mutation: {
        register : async(_, { registerInput: { username, email, password, confirmPassword } }, context, info) => {
            // TODO Validate user data
            // TODO Make sure user doesnt already exist
            // TODO hash the password and auth token

            const user = await row(`insert into users(username, user_password, user_email) values ($1, crypt($2, gen_salt('bf')), $3) returning * `, username, password, email)

            const token = jwt.sign(user, SECRET_KEY, {expiresIn : '1h'})

            return await row(`UPDATE users set token = $2 WHERE user_id = $1 returning *`, user.user_id, token)

        }
    }
}