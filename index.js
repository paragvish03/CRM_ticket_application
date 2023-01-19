require('./config/db.config')
const col = require('cli-color')
const express = require('express')
const User = require('./models/User')
const app = express()
const bcrypt = require("bcrypt")
const { userRouter } = require('./router/userRouter')
const { Ticketrouter } = require('./router/ticket')
// const Client = require("node-rest-client").Client
// const client = new Client();
//app.set(express.urlencoded({force:true}))


app.use(express.json())
app.use(userRouter)
app.use(Ticketrouter)

async function init() {
    await User.create({
        name: "ADMIN",
        email: "ADMIN@test.com",
        password: bcrypt.hashSync("ADMIN",10),
        UserType: "ADMIN",
        UserId: "ADMIN01",
        UserStatus: "APPROVED"
    })

}

app.get('/', (req, res) => {
    res.send({ message: "hello homepage" })
})

app.listen(4040, async (req, res) => {
    //  await init()
    console.log(col.greenBright("\n server is running 4040"))
})





