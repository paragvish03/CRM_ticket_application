const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { checktoken, checkadmin } = require('../middleware/auth')
const clk = require('cli-color')
const router = require('express').Router()
const { objconverter } = require('../utility')
const { modelName } = require('../models/User')

router.post('/signup', async (req, res) => {
  const details = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    UserId: req.body.UserId,
    UserStatus: req.body.UserStatus,
    UserType: req.body.UserType,
  }
  try {

    if (details.UserType == "ENGINEER" || details.UserType == "ADMIN") {
      details.UserStatus = "PENDING"
      await User.create(details)
      res.send({ message: "user created successful waiting for approval" })

    } else {
      await User.create(details)
      res.send({ message: "user created successful" })
    }


  } catch (error) {
    res.send({ message: error.message })
  }
})

router.post('/signin', async (req, res) => {
  const details = {
    email: req.body.email,
    password: req.body.password
  }
  try {

    let user = await User.findOne({ email: details.email })
    if (user) {
      let validpassword = bcrypt.compareSync(details.password, user.password)
      if (validpassword && user.UserStatus == "PENDING") {

        res.send({ message: "account under pending status" })

      }
      else if (validpassword) {
        console.log("<?L>>>>>><<<<" + user.UserStatus)
        let token = jwt.sign({ userid: user }, "itssecretkey32", { expiresIn: "1h" })
        console.log(clk.yellow(token))
        res.send({ message: "login successful !" })
      }
      else {
        res.send({ message: "invalid credential" })
      }

    } else {
      res.send({ message: "invalid user email" })
    }


  } catch (error) {
    res.send({ message: error.message })
  }


})


// })
router.get('/crm/api/users/', [checktoken, checkadmin], async (req, res) => {
  let result;
  let UserType = req.query.UserType;
  let UserStatus = req.query.UserStatus;
  let name = req.query.name;



  if (UserType) {
    result = await User.find({ UserType: UserType })
    // console.log(result)
    res.status(200).send(objconverter(result))
  }
  else if (UserStatus) {
    result = await User.find({ UserStatus: UserStatus })
    // console.log(result)
    res.status(200).send(objconverter(result))
  }
  else if (name) {
    result = await User.find({ name: name })
    // console.log(result)
    res.status(200).send(objconverter(result))
  }
  else if (UserStatus && name) {
    result = await User.find({
       name: name 
    } )

    if(result.UserStatus == User)
    // console.log(result)
    console.log(objconverter(result))
    res.status(200).send(objconverter(result))
  }
  else {
    result = await User.find()
    res.status(200).send(objconverter(result))
  }


  // res.status(200).send( result.name)
  console.log(">>>><<<<<", req.query)

})
//router.get('/crm/api/users/:userId',[checktoken, checkadmin],userController.findById)
//router.put('/crm/api/users/:userId',[checktoken, checkadmin],userController.update)  //approval






router.get('/checktoken', [checktoken, checkadmin], (req, res) => {
  res.send("workingg")
})


module.exports = {
  userRouter: router
}