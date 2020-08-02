const {logic}=require('../models/create')
const {answer}=require('../models/create')
const {verbal}=require('../models/create')
const {quantitative}=require('../models/create')
const sendMail=require('../mail')
const verbal_submit=(req,res)=>{
    var main=req.body;
    
    var usval=Object.values(req.body);
    main.userId=req.user.id;
    main.name=req.user.name;
    answer.find().then((result)=>{
        var ans=result[0].ans
        var count=0;
        for(let i=0;i<10;i++)
        {
            if(usval[i]==ans[i])
                count++;
        }
        const check={userId:req.user.id}
        verbal.findOne({userId:req.user.id}).then(record=>{
            if(record!=null)
            {
                record.mark.push(count);
                record.save().then(()=>{});
            }
            else
            {
                main.mark=[];
                main.mark=[count];
            }
        })
        verbal.findOneAndUpdate(check,main,{new:true}).then(result=>{
            if(result==null)
            {
                const body=new verbal(main);
                body.save().then((result)=>{
                    res.render('home',{title:'Home'});
                })
            }
            else
                res.render('home',{title:'Home'});
        }).then(()=>{
            
            let output=`<p>Thanks for attending the Test</p><br><h3>You have scored</h3><h1>${count}/10</h3>`;
            let sub='Results Of Verbal Ability';
            sendMail(req.user.email,sub,output)
        }).catch(err=>{console.log(err)})  
})
}
const qa_submit=(req,res)=>{
    var main=req.body;
    var userval=Object.values(req.body);
    main.userId=req.user.id;
    main.name=req.user.name;
    answer.find().then((result)=>{
        var qa_ans=result[1].ans
        var count=0;
        for(let i=0;i<10;i++)
        {
            if(userval[i]==qa_ans[i])
                count++;
        }
        const check={userId:req.user.id}
        quantitative.findOne({userId:req.user.id}).then(record=>{
            if(record!=null)
            {
                record.mark.push(count);
                record.save().then(()=>{});
            }
            else
            {
                main.mark=[];
                main.mark=[count];
            }
        })
        quantitative.findOneAndUpdate(check,main,{new:true}).then(result=>{
            if(result==null)
            {
                const body=new quantitative(main);
                body.save().then((result)=>{
                    res.render('home',{title:'Home'});
                })
            }
            else
                res.render('home',{title:'Home'});
        }).then(()=>{
            
            let output=`<p>Thanks for attending the Test</p><br><h3>You have scored</h3><h1>${count}/10</h3>`;
            let sub='Results Of Quantitaive Aptitude';
            sendMail(req.user.email,sub,output)
        }).catch(err=>{console.log(err)}) 
    })
}
const lg_submit=(req,res)=>{
    var main=(req.body);
    var userval=Object.values(req.body);
    main.userId=req.user.id;
    main.name=req.user.name;
    answer.find().then((result)=>{
        var qa_ans=result[2].ans
        var count=0;
        for(let i=0;i<10;i++)
        {
            if(userval[i]==qa_ans[i])
                count++;
        }
        const check={userId:req.user.id}
        logic.findOne({userId:req.user.id}).then(record=>{
            if(record!=null)
            {
                record.mark.push(count);
                record.save().then(()=>{});
            }
            else
            {
                main.mark=[];
                main.mark=[count];
            }
        })
        logic.findOneAndUpdate(check,main,{new:true}).then(result=>{
            if(result==null)
            {
                const body=new logic(main);
                body.save().then((result)=>{
                    console.log('Saved in Logical')
                    res.render('home',{title:'Home'});
                })
            }
            else
                res.render('home',{title:'Home'});
        }).then(()=>{
            
            let output=`<p>Thanks for attending the Test</p><br><h3>You have scored</h3><h1>${count}/10</h3>`;
            let sub='Results Of Logical Reasoning';
            sendMail(req.user.email,sub,output)
        }).catch(err=>{console.log(err)}) 
       
    })
}
module.exports={qa_submit,lg_submit,verbal_submit}