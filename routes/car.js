const route             = require('express').Router();
const jwt               = require('../utils/jwt');
//MODELS
const  CAR_MODEL  = require('../models/car');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const { uploadMulter }  = require('../utils/config_multer');
const IS_LOGIN          = require('../utils/isLogin');

route.post('/add-car',  uploadMulter.single('image'), async (req, res) => {
    let infoUser = req.session;
    let owner = infoUser.user.infoUser._id;
    let { name, fuel, note, manufacture, description, slot } = req.body;
    let infoFile = req.file;
    let infoCar = await CAR_MODEL.insert({ name, fuel, note, manufacture, description, slot, owner, image: infoFile.originalname});
    res.json(infoCar);
})

route.get('/add-car', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'dashboard/pages/add-car', {});
})

route.get('/list-car', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'dashboard/pages/list-car', {});
})
route.get('/update/:carID',IS_LOGIN, async (req, res) => {
    
    renderToView(req, res, 'dashboard/pages/update', {});
}) 



module.exports = route;