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
    res.redirect('/category/add-category');
})
route.get('/add-category', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'dashboard/pages/add-category', {});
})
route.get('/remove/:categoryID', async (req, res) => {
    let { categoryID } = req.params;
    let infoAfterRemove = await CATEGORY_MODEL.remove({categoryID });
    console.log(infoAfterRemove);
    res.redirect('/category/add-category')
})

module.exports = route;