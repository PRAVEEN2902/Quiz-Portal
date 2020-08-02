const router=require('express').Router();
const passport=require('passport');
const control=require('../controllers/control');
const authcheck=(req,res,next)=>{
    if(!req.user)
    {
        res.redirect('/')
    }
    else
        next();
}
router.get('/home',authcheck,(req,res)=>{
    res.render('home',{title:'Home'});
    
})
router.get('/logic',authcheck,(req,res)=>{
    res.render('logic',{title:'Logical'})
})
router.get('/verbal',authcheck,(req,res)=>{
    res.render('verbal',{title:'Verbal'})
})
router.get('/qa',authcheck,(req,res)=>{
    res.render('qa',{title:'Quantitative'})
})

router.post('/lg-submit',control.lg_submit)
router.post('/verbal-submit',control.verbal_submit)
router.post('/qa-submit',control.qa_submit)

router.use((req,res)=>{
    console.log(req.url)
    res.status(404).render('404');
})

module.exports={router};