const errHandle = (err, req, res, next) => {
    let status
    let error = []
    console.log(err)
    switch(err.name) {
        case "UNAUTHORIZED" : 
            error.push({"message": "You Are Not Authorized"})
        break;
        case "NOT_LOGIN" :
            error.push({"message": "Belum Login"})
        break;
        default:
            status = 500
            err.push(err.name)
        break;
    }

    res.json(status, {error})
}

module.exports = errHandle