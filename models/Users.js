import {
    connection as db
} from '../config/index.js'
import {
    hash,
    compare
} from 'bcrypt'
import {
    createToken
} from '../middleware/AuthenticationUser.js'

class Users {
    fetchUsers(req, res) {
        const qry = `
        SELECT userID, firstName, lastName,
        userAge, gender, emailAdd, userPwd,
        userRole
        FROM Users;
        `
        db.query(qry, (err, results) => {
            if (err) throw err
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
        db.query(qry, (err, result) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                result
            })
        })
    }
    async createUser(req, res) {
        // Payload
        let data = req.body;
        if (data.userPwd) {
            data.userPwd = await hash(data.userPwd, 10);
        }
        const qry = `
        INSERT INTO Users
        SET ?
    `;
        db.query(qry, [data], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    status: 500,
                    msg: 'Internal server error'
                });
            } else {
                res.json({
                    status: res.statusCode,
                    msg: 'You\'re registered.'
                });
            }
        });
    }

    async updateUser(req, res) {
        // let userId = +req.params.id;
        let newData = req.body;
        if (newData.userPwd) {
            newData.userPwd = await hash(newData?.userPwd, 10);
        }
        const qry = `
        UPDATE Users
        SET ?
        WHERE userID = ${req.params.id};
        `;
        db.query(qry, [newData], (err) => {
            if (err) throw err
            res.json({
                status: res.statusCode,
                msg: 'The User information is Updated.'
            })
        })
    }

    deleteUser(req, res) {
        // let userId = +req.params.id;
        const qry = `
        DELETE FROM Users
        WHERE userID = ${req.params.id};
        `;
        db.query(qry, (err) => {
            if (err) throw err
                res.json({
                    status: res.statusCode,
                    msg: 'The user was successful Deleted.'
                })
        })
    }

    login(req, res) {
        const { emailAdd, userPwd } = req.body
        const qry = `
       SELECT userID, firstName, lastName,
       userAge, gender, emailAdd, userPwd,
       userRole
       FROM Users
       WHERE emailAdd = '${emailAdd}';
        `
        db.query(qry, async (err, result) => {
            if (err) throw err
            if (!result?.length) {
                res.json({
                    status: res.statusCode,
                    msg: "You provided a wrong email address."
                })
        }else {
            const validPass = await compare
                (userPwd, result[0].userPwd)
            if(validPass) {
                const token = createToken({
                    emailAdd,
                    userPwd
                })
                req.json({
                    status: res.statusCode,
                    msg: "Yore're logged in.", token,
                    result: result[0]
                })
            } else {
                res.json({
                    status: res.statusCode,
                    msg: "Please provided the correct password."
                })
            }
        }
        })
    }
}

export {
    Users
}