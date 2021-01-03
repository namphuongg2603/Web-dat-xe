const route = require('express').Router();
//MODELS
const  CAR_MODEL  = require('../models/user_mod');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');

route.get('/home', async (req, res) => {
    renderToView(req, res, 'website/pages/home', {});
})

route.get('/login', async (req, res) => {
    renderToView(req, res, 'website/pages/login', {})
})

route.get('/logout', async (req, res) => {
    req.session.token = undefined;
    return res.redirect('/home');
})

route.get('/register', async (req, res) => {
    renderToView(req, res, 'website/pages/register', {})
})
route.get('/booking', async (req, res) => {
    renderToView(req, res, 'website/pages/booking', {})
})

module.exports = route;