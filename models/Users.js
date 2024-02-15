import {connection as db} from '../config/index'
import {hash, compare} from 'bcrypt'
import { createToken } from '../middleware/AuthenticationUser'

class Users{
    fetchUsers(req, res) {
        const qry = `
        SELECT userID, firstName, lastName,
        userAge, gender, emailAdd, userPwd,
        userRole
        FROM Users;
        `
        db.query(qry, (err, results)=> {
            if(err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
fetchUser(req, res) {
    const qry = `
    SELECT userID, firstName, lastName,
        userAge, gender, emailAdd, userPwd,
        userRole
        FROM Users
        WHERE userID = ${req.params.id};
    `
    db.query(qry, (err, result)=> {
        if(err) throw err
        res.json({
            status: res.statusCode,
            result
        })
    })
}
async createUser(req, res) {
    // Payload
    let data = req.body
        data.userPwd = await hash(data?.userPwd, 10)
        let user = {
            emailAdd: data.emailAdd,
            userPwd: data.userPwd
        }
        const qry = `
        INSERT INTO Users
        SET ?;
        `
        db.query(qry, [data], (err)=> {
            if(err) {
                res.json ({
                    status: res.statusCode,
                    msg: 'This email already exists.'
                })
            }else {
                // Create a token
                let token = createToken(user)
                res.json({
                    status: res.statusCode,
                    token,
                    msg: 'You\'re registered'
                })
            }
        })
    }
}

export {
    Users
}