const passport=require('passport');
const keys = require('../keys');
const GoogleStrategy=require('passport-google-oauth20');
const model=require('../models/model')
const FacebookStrategy=require('passport-facebook')
passport.serializeUser((user,done)=>
{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>
{
    model.findById(id).then((user)=>{
        done(null,user);
    })
})

passport.use(new FacebookStrategy({
    clientID: keys.facebook.FACEBOOK_APP_ID,
    clientSecret: keys.facebook.FACEBOOK_APP_SECRET,
    callbackURL: "https://apti-portal.herokuapp.com/facebook/callback",
    profileFields:['email','displayName']
  },
  function(accessToken, refreshToken, profile, done) {
   // console.log(profile)
    model.findOne({socialid:profile.id}).then((current)=>{
        if(current)
        {
            console.log('User exists');
            done(null,current);
        }
        else{
            new model({
                name:profile.displayName,
                socialid:profile.id,
                email:profile.emails[0].value,
                provider:profile.provider
            }).save().then((result)=>{
                console.log('Saved Sucessfully'+result);
                done(null,result);
            })
        
        }
    })
  }
));









passport.use(new GoogleStrategy({
    callbackURL:'/google/redirect',
    clientID:keys.google.clientId,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
   // console.log(profile)
    model.findOne({socialid:profile.id}).then((current)=>{
        if(current)
        {
            console.log('User exists');
            done(null,current);
        }
        else{
            new model({
                name:profile.displayName,
                socialid:profile.id,
                email:profile.emails[0].value,
                provider:profile.provider
            }).save().then((result)=>{
                console.log('Saved Sucessfully'+result);
                done(null,result);
            })
        
        }
    })
   
}))