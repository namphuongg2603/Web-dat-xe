const route = require('express').Router();
const jwt               = require('../utils/jwt');
//MODELS
const  CATEGORY_MODEL  = require('../models/category');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const IS_LOGIN          = require('../utils/isLogin');


route.post('/add-category', async (req, res) => {
    let { name, description } = req.body;
    let infoCategory = await CATEGORY_MODEL.insert({ name, description });
    res.json(infoCategory);
})
route.get('/add-category', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'dashboard/pages/add-category', {});
})


module.exports = route;