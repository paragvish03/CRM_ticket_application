const jwt = require("jsonwebtoken")



exports.checktoken = async function (req, res, next) {
    let token = req.headers['jwt_token']

    try {
        if (token) {
            jwt.verify(token, "itssecretkey32", function (err, decoded) {
                if (err) {
                    res.send({ message: "please sigin again" })
                } else {
                    req.userid= decoded.userid.UserType
                    req.username = decoded.userid.name
                    req.USERID = decoded.userid
                    console.log(req.USERID.email )
                    next()
                }
            })


        } else {
            res.send({ message: "session expired" })
        }
    } catch (error) {
        res.send({ message: error.message })
    }

}

exports.checkadmin = async function (req, res, next) {

let isadmin = req.userid
try {
if(isadmin == 'ADMIN'){
    next()
}else{
    res.send({message:"Not Authorised "})
return;
}


    
} catch (error) {
    res.send(error.message)
    return;
}


}
exports.checkengineer = async function (req, res, next) {


    let isadmin = req.userid
    try {
    if(isadmin == 'ENGINEER'){
        next()
    }else{
        res.send({message:"only engineer Authorised "})
    return;
    }
    
    
        
    } catch (error) {
        res.send(error.message)
        return;
    }
    
    
}