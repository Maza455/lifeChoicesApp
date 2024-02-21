import express from 'express'
import bodyParser from 'body-parser'
import { users } from '../models/index.js'
import { verifyToken } from '../middleware/AuthenticationUser.js'

const userRouter = express.Router()

//Fetch users
userRouter.get('/', (req, res) => {
  try {
    users.fetchUsers(req, res)
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to retrieve users.'
    })
  }
})

//Add a user
userRouter.post('/register/', bodyParser.json(), (req, res) => {
  try {
    users.createUser(req, res)
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: 'Failed to add a new user.'
    })
  }
})

// Update a user
userRouter.patch('/update/:id', bodyParser.json(), (req, res)=> {
    try {
      // const { id } = req.params;
      users.updateUser(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: 'Failed to update a user.',
      })
    }
  });
  
  // Delete a user
  userRouter.delete('/delete/:id', (req, res)=> {
    try {
      // const { id } = req.params;
      users.deleteUser(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: 'Failed to delete a user.',
      })
    }
  });

  userRouter.post('/login', bodyParser.json(), (req, res)=> {
    try {
      // const { id } = req.params;
      users.login(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: 'Failed to login, try again.',
      })
    }
  });

  
  
  export {
    userRouter,
    express,
    verifyToken
  };