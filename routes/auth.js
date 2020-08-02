const router=require('express').Router();
const passport=require('passport');
const admin=require('../models/admin')
const model=require('../models/create');
const { logic } = require('../models/create');
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
  
  admin.find({email:req.user.email}).then(result=>{
    if(result!=null)
      {
        var quans,verbals,logical;
        model.logic.find({}).then(datal=>{
          logical=datal
          model.verbal.find({}).then(datav=>{
            verbals=datav
            model.quantitative.find({}).then(dataq=>{
              quans=dataq
              res.render('admin',{logical,verbals,quans})
            })
          })
        })
      }
      else{
        res.redirect('/home');
      }
  })
  
  
  
})



module.exports=router;