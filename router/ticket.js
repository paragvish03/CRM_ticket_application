const router = require('express').Router()
const Ticket = require('../models/Ticket')
const { checktoken, checkengineer, checkadmin } = require('../middleware/auth')
const User = require('../models/User')

router.post('/crm/ticket/create', [checktoken], async (req, res) => {
    const ticketdetails = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.body.reporter
        //  assignee: req.body.assignee
    }


    try {
        const ticket = await Ticket.create(ticketdetails)
        res.status(201).send({ "title": ticket.title, "description": ticket.description })
        console.log(ticket)
    } catch (error) {
        res.status(201).send(error.message)
        console.log(error.message)

    }
    // res.send({bye:"bye"})
})

//fetch by id so enginner accept manually
router.post('/crm/accept/:ticketid', [checktoken,checkengineer], async (req, res) => {

    let ticketid = req.params.ticketid
    let username = req.username
    if (ticketid) {
        let result1 = await Ticket.findById(ticketid)
        console.log(result1.status)
        if( !(result1.status == "inprogress") && !(result1.status == "close" )) {
            let result = await User.findOne({ name: username })
            result1.status = "inprogress"
            await result1.save()
            
            result.ticketsAssigned.push(ticketid)
            await result.save()
            console.log("<<<<<......>>>>>"+result)
            
            res.send({ message: "accepetd" })
            console.log(result1)
        } else {
            res.send({ message: `ticket already ${result1.status } by engineer`  })
        }
    } else {
        res.send({ message: "ticket not valid" })
    }

   // res.send({ message: result })

})

//fetch pending ticket in bucket
router.get('/crm/mybucket', [checktoken,checkengineer], async(req,res)=>{
    let usrid = req.USERID.UserId
    console.log(usrid)
    let result = await User.findOne({UserId: usrid})
if(result.ticketsAssigned.length==0){ 

    res.send({message:"no ticket"})
}else{

    res.send(result.ticketsAssigned) 
}

})

router.get('/crm/mybucket/me', [checktoken,checkadmin], async(req,res)=>{
    res.send("hello ADMIN")
})

module.exports = {
    Ticketrouter: router
}