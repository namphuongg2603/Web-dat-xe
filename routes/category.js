const route = require('express').Router();
//MODELS
const  CATEGORY_MODEL  = require('../models/category');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');

route.post('/add-category', async (req, res) => {
    let { name, description } = req.body;
    let infoCategory = await CATEGORY_MODEL.insert({ name, description });
    res.json(infoCategory);
    
})

module.exports = route;