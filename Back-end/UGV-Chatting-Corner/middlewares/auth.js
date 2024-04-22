const isLogin = (req,res,next)=>{
    try {
        if(req.session.user){}
        else
        {
          res.reirect('/');
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

const isLogout = (req,res,next)=>{
    try {
        if(req.session.user)
        {
           res.redirect('/dashboard');
        } 
        next();           
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {isLogin,isLogout}