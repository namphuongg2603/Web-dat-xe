const route = require('express').Router();
//MODELS
const  RENT_MODEL  = require('../models/rent');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const { uploadMulter} = require('../utils/config_multer');

route.post('/add-rent', async (req, res) => {
    let { car, price, location, promotion, category, description, image, owner, hotline } = req.body;
    let infoRent = await RENT_MODEL.insert({ car, price, location, promotion, category, description, image, owner, hotline });
    res.json(infoRent);
})

module.exports = route;