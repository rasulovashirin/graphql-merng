const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const { row } = require("../../database/postgres")
const { SECRET_KEY } = require("../../config")
const { validateRegisterInput } = require("../../util/validators")

module.exports = {
    Mutation: {
        register : async(_, { registerInput: { username, email, password, confirmPassword } }, context, info) => {
            // Validate user data
            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword)
            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }
            // Make sure user doesnt already exist
            const checkUsername = await row(`select * from users where username = $1`, username)

            if(checkUsername) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // hash the password and auth token

            const user = await row(`insert into users(username, user_password, user_email) values ($1, crypt($2, gen_salt('bf')), $3) returning * `, username, password, email)

            const token = jwt.sign(user, SECRET_KEY, {expiresIn : '1h'})

            return await row(`UPDATE users set token = $2 WHERE user_id = $1 returning *`, user.user_id, token)

        }
    }
}