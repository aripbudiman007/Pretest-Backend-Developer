const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static async login(req, res, next) {
        try {
            const { email, password} = req.body

            const user = await User.findOne({where:{email}})

            if(user && bcrypt.compareSync(password, user.password)) {
                const payload = {
                    id: user.id,
                    email: user.email
                }

                const accessToken = jwt.sign(payload, "rahasia")

                res.send({accessToken})
            }

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController