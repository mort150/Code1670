function requiredLogin(req,res,next) {
    if(req.session["User"]){
        return next;
    }else{
        res.redirect('/login')
    }
}

module.exports = {requiredLogin}