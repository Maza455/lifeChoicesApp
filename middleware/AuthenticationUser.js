import { config } from "dotenv";
config()
import {sign, verify} from "jsonwebtoken";

function createToken(user) {
    let timeToken = 60 * 60
    return sign({
        emailAdd: user.emailAdd,
        userPwd: user.userPwd
    },
    process.env.SECRET_KEY,
    {
        expiresIn: timeToken
    }
    )
}

function verifyToken(req, res, next) {
    // Retrieve a token from the browser
    const token = req?.headers['Authorization']
    if(token) {
        if(verify(token, process.env.SECRET_KEY)) {
            next()
        }else {
            res?.json ({
                status: res.statusCode,
                msg: "Please provide a right token."
            })
        }
    }else {
        res?.json({
            status: res.statusCode,
            msg: "Please login"
        })
    }
}

export {
    createToken,
    verifyToken
}