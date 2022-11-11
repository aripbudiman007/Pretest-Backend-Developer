const { Answer } = require('../models')

class AnswerController {


    static async createAnswer(req, res, next) {
        try {
            const { answer } = req.body
            const { question_id } = req.params

            const response = await Answer.create({
                answer, question_id,  user_id:req.userId
            })

            if(response) {
                res.json({
                    "status" : "created",
                    "data" :[]
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async updteAnswer(req, res, next) {
        try {
            const { id } = req.params
            const { answer } = req.body

            const response = await Answer.update({
                answer,
                where: {id, user_id: req.userId}
            })

            if(response) {
                res.json({
                    "status" : "updated",
                    "data" :[]
                })
            }else {
                throw {name:"UNAUTHORIZED"}
            }
           
        } catch (error) {
            next(error)
        }
    }

    static async deleteAnswer(req, res, next) {
        
        try {
            const { id } = req.params
            
            const answer = await Answer.destroy({
                where: {id, user_id: req.userId}
            })

            if(answer) {
                res.json({
                    "status" : "deleted",
                    "data" :[]
                })
            }else {
                throw {name:"UNAUTHORIZED"}
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = AnswerController