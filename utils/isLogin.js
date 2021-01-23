const jwt = require("./jwt");
module.exports = async function (req, res, next) {
    let { token } = req.session;
    if (!token){
        console.log("Ban can phai dang nhap")
        return res.redirect('/login');
    } else{
    //     let checkRole = await jwt.verify(token);
    //     if( checkRole.data.role == 0 ){
    //         return res.redirect('/');
            next();
        
    } 

    
}