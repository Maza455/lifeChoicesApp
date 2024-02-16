// console.log('I see you')

import express from 'express';
import path from 'path'

// create an express app
const app = express()
const router = express.Router()
app.use(
    router,
    express.static('./static'));

const port = +process.env.PORT || 5000

// Routers: express
router.get('^/$|/express', display, (req, res)=> {
    res.status(200).sendFile(path.resolve('./static/index.html'))
})

// Router
// app.get('/', (req, res)=> {
//     res.status(200).json({
//         msg: "You're welcome!!!"
//     })
// })

// app.get('/', display, (req, res)=> {
//     res.json({
//         status: res.statusCode,
//         msg: 'You are getting there!'
//     })
// })

// app.get('*', (req, res)=> {
//     res.json({
//         status: 404,
//         msg: '404 page'
//     })
// })
// app.listen(port)

// Middleware
router.get('^/$|/express', display, (req, res)=> {
    res.json({
        status: res.statusCode,
        msg: 'You are getting there!'
    })
})

function display(req, res, next) {
    console.log("Hello there!");
    next()
}

app.listen(port)