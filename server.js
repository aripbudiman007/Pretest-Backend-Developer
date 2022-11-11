const restify = require('restify');
const AnswerController = require('./controllers/AnswerController');
const QuestionController = require('./controllers/QuestionController');
const UserController = require('./controllers/UserController');
const { auth, authorization} = require('./middleware/auth');
const errHandle = require('./middleware/errHandle');

const server = restify.createServer();

server.get("/", (req, res) =>{
    res.send({"message" : "hello"})
})

server.post("/login", UserController.login)
server.get("/question", auth, QuestionController.getAll)
server.get("/question/:id", auth, QuestionController.findById)
server.post("/question", auth, QuestionController.createQuestion)
server.put("/question/:id", auth, authorization , QuestionController.updteQuestion)
server.del("/question/:id", auth, authorization , QuestionController.deleteQuestion)
server.post("/answer/:question_id", auth, AnswerController.createAnswer)
server.put("/answer/:id", auth, AnswerController.updteAnswer)
server.del("/answer/:id", auth, AnswerController.deleteAnswer)


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser())
server.use(errHandle)
server.listen(3000, () => {
    console.log(`server running on port 3000`);
})