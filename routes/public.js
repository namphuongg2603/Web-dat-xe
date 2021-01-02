const route = require('express').Router();
//MODELS
const  CAR_MODEL  = require('../models/user_mod');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');

route.get('/home', async (req, res) => {
    renderToView(req, res, 'website/pages/home', {})
})

route.get('/login', async (req, res) => {
    renderToView(req, res, 'website/pages/login', {})
})

route.get('/register', async (req, res) => {
    renderToView(req, res, 'website/pages/register', {})
})

module.exports = route;