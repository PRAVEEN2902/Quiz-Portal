const keys=require('./keys')
const nodemailer=require('nodemailer');
let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:keys.oAuth.id,
        pass:keys.oAuth.password
    }
})

let sendMail=function(email,sub,output){
    let mailOptions={
        from:'praveenkumarpdkt25@gmail.com',
        to:email,
        subject:sub,
        html:output
    }
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err)
            console.log(err);
        else
            console.log('Email sent'+info.response);    
    })
}
module.exports=sendMail;