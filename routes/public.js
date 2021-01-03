const route = require('express').Router();
const RENT_COLL = require('../database/rent_col');
//MODELS
const  CAR_MODEL  = require('../models/user_mod');
const  RENT_MODEL  = require('../models/rent');

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

route.get('/booking/:rentID', async (req, res) => {
    let { rentID } = req.params;
    let infoRent = await RENT_MODEL.getInfo({ rentID });
    renderToView(req, res, 'website/pages/booking', { infoRent: infoRent.data });
})

module.exports = route;