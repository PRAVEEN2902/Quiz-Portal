const router=require('express').Router();
const passport=require('passport');

router.get('/google',passport.authenticate('google',{
    scope:['email','profile']
}));

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/home');
})

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');  
})

router.get('/facebook',passport.authenticate('facebook',{scope:['email']}));

router.get('/facebook/callback',passport.authenticate('facebook'),(req,res)=>{
  res.redirect('/home');
})



module.exports=router;