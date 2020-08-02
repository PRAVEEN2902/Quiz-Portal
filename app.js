const mongoose=require('mongoose');
const express=require('express');
const app=express();
const port=process.env.PORT || 3000;
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
mongoose.set('useFindAndModify', false);
const keys = require('./keys');
const passport=require('passport')
const cookieSession=require('cookie-session');
const passportsetup=require('./config/passport');
const authRoutes=require('./routes/auth')
const homeRoutes=require('./routes/home')
const db=`mongodb+srv://Praveen:${keys.db.password}@test.ldcov.mongodb.net/${keys.db.name}?retryWrites=true&w=majority`
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log('Connected');
})

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:['prettysimpleLogin']
}))
app.use(passport.initialize());
app.use(passport.session());




app.get('/',(req,res)=>{
    res.render('login');
})

app.use(authRoutes);
app.use(homeRoutes.router);


app.listen(port);