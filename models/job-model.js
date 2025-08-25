const { Timestamp } = require("bson");
const mongoose = require("mongoose");


const jobSchema = ({
    company : {
        type:String,
        required:true,
        trim:true
    },
    position : {
        type:String,
        required:true,
        trim:true
    },
    status : {
        type:String,
        enum:['interview','pending','declined'],
        default:'pending'
    },
    createdBy : {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },

},{Timestamp:true});



module.exports= mongoose.model('Job',jobSchema);