const col = require('cli-color')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/company').then(()=>console.log(col.bgGreen(" database connected successfully !!"))).catch((e)=>{console.log(e)})


