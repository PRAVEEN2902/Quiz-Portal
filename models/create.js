const mongoose=require('mongoose');
const Schema1=mongoose.Schema;
const logical=new Schema1({
    userId:String,
    qtn1: String,
    qtn2: String,
    qtn3: String,
    qtn4: String,
    qtn5: String,
    qtn6: String,
    qtn7: String,
    qtn8: String,
    qtn9: String,
    qtn10: String,
    mark:{
        type:[Number]
    }
})
const logic=mongoose.model('logical',logical)
const Schema2=mongoose.Schema
const verb=new Schema2({
    userId:String,
    qtn1: String,
    qtn2: String,
    qtn3: String,
    qtn4: String,
    qtn5: String,
    qtn6: String,
    qtn7: String,
    qtn8: String,
    qtn9: String,
    qtn10: String,
    mark:[Number]
})
const verbal=mongoose.model('verbal',verb)
const Schema3=mongoose.Schema
const quans=new Schema3({
    userId:String,
    qtn1: String,
    qtn2: String,
    qtn3: String,
    qtn4: String,
    qtn5: String,
    qtn6: String,
    qtn7: String,
    qtn8: String,
    qtn9: String,
    qtn10: String,
    mark:[Number]
})
const quantitative=mongoose.model('quantitative',quans)
const Schema4=mongoose.Schema
const ans=new Schema4({
    ans:[String]
})
const answer=mongoose.model('answer',ans);
module.exports={logic,verbal,quantitative,answer};