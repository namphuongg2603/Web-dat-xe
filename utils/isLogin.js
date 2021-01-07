module.exports = async function (req, res, next) {
    let { token } = req.session;
    if (!token){
        console.log("Ban can phai dang nhap")
        return res.redirect('/login');
    }
    next();
}