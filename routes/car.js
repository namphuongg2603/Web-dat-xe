const route = require('express').Router();
//MODELS
const  CAR_MODEL  = require('../models/car');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const { uploadMulter} = require('../utils/config_multer');


route.post('/add-car', async (req, res) => {
    let { name, fuel, note, manufacture, description, slot, owner } = req.body;
    let infoCar = await CAR_MODEL.insert({ name, fuel, note, manufacture, description, slot, owner });
    res.json(infoCar);
    
})

module.exports = route;