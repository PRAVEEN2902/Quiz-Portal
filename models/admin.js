const mongoose=require('mongoose');
const schema=mongoose.Schema;
var model=new schema({
    email:String
})
var adminModel=mongoose.model('admin',model)
module.exports=adminModel