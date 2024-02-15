import express from 'express'
import bodyParser from 'body-parser'
import { users } from '../models/index.js'
import { verifyToken } from '../middleware/AuthenticationUser.js'

const userRouter = express.Router()

//Fetch users
userRouter.get('/', (req, res)=> {
    try{
        users.fetchUsers(req, res)
    }catch (e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to retrieve users.'
        })
    }
})

//Add a user
userRouter.post('/register', bodyParser.json, (req, res)=> {
    try{
        users.createUser(req, res)
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'Failed to add a new user.'
        })
    }
})