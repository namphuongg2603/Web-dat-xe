module.exports = async function (req, res, next) {
    let { token } = req.session;
    if (!token){
        return res.redirect('/login');
    }/* else{
        let checkRole = await verify(token);
        console.log({ checkRole });
    } */

    
    next();
}