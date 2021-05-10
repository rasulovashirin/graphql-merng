const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const { row } = require("../../database/postgres")
const { SECRET_KEY } = require("../../config")
const { validateRegisterInput, validateLoginInput } = require("../../util/validators")

module.exports = {
    Mutation: {
        login: async(_, { username, password }) => {

                const { errors, valid } = validateLoginInput(username, password)

                if(!valid) {
                    throw new UserInputError('Errors', { errors })
                }

                const user = await row(`select * from users where username = $1 AND user_password = crypt($2, user_password)`, username, password)

                if(!user) {
                    errors.general = 'User not found'
                    throw new UserInputError('User not found', { errors })
                }
                user.token = null
                const token = jwt.sign(user, SECRET_KEY)

                user.token = token

                return user

        },
        register: async(_, { registerInput: { username, email, password, confirmPassword } }) => {

            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword)

            if(!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const checkUsername = await row(`select * from users where username = $1`, username)

            if(checkUsername) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            const user = await row(`insert into users(username, user_password, user_email) values ($1, crypt($2, gen_salt('bf')), $3) returning * `, username, password, email)

            const token = jwt.sign(user, SECRET_KEY, {expiresIn : '1h'})

            user.token = token

            return user

        }
    }
}