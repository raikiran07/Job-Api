
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    Company:{
        type:String,
        required:[true,'Please enter company name'],
        maxlength:50
    },
    Position:{
        type:String,
        required:[true,'Please enter position'],
        maxlength:50
    },
    Status:{
        type:String,
        enum:['Pending','Interview','Selected'],
        default:'Pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide user']
    }
},{timestamps:true})


module.exports = mongoose.model('Job',jobSchema)