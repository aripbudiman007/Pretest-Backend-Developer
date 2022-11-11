const { Question, Answer } = require('../models')
class QuestionController {
    static async getAll(req, res, next) {
        try {
            const questions = await Question.findAll({
                attributes: ["id","question"],
            })

            if(questions){
                res.json({
                    "status": "OK",
                    "data":{questions}
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async findById(req, res, next) {
        try {
            const { id } = req.params

            const question = await Question.findOne({
                attributes: ["id","question"],
                include:[
                    {
                        model : Answer,
                        attributes: ["id", "answer", "question_id", "user_id"]
                    }
                ],
                where:{id}
            })

            if(question) {
                res.json({
                    "status": "OK",
                    "data":question
                })
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async createQuestion(req, res, next) {
        try {
            const { question } = req.body

            const response = await Question.create({
                question, user_id:req.userId
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

    static async updteQuestion(req, res, next) {
        try {
            const { question } = req.body
            const { questions } = req

            questions.question = question
            
            questions
            .save()
            .then(() => {
                res.json({
                    "status" : "updated",
                    "data" :[]
                })
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteQuestion(req, res, next) {
        const { questions } = req

        questions.destroy()
        .then(() => {
            res.json({
                "status" : "deleted",
                "data" :[]
            })
        })
    }
}

module.exports = QuestionController