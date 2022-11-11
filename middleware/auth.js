const { User, Question } = require('../models')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    if(!req.headers.accesstoken) {
        throw {name: "NOT_LOGIN"}
    }

    try {

        const decoded = jwt.verify(req.headers.accesstoken, "rahasia") 

        req.userId = decoded.id

        const user = await User.findOne({where:{id:decoded.id}})

        if(user) {
            next()
        }

    } catch (error) {
        throw {name: "INVALID_TOKEN"}
    }
}

const authorization = async (req, res, next) => {
    
    try {
        const { id } = req.params
        
        const result = await Question.findOne({
            attributes: ["id","question"],
            where: {id, user_id: req.userId}
        })

        if(result) {
            req.questions = result
            next()
        } else {
            throw {name: "QUESTION_NOT_FOUND"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { auth, authorization}