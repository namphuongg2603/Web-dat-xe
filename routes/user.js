const route = require('express').Router();
//MODELS
const  USER_MODEL  = require('../models/user_mod');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const { uploadMulter} = require('../utils/config_multer');
const path          = require('path');
const fs            = require('fs');
// const ROLE_ADMIN = require('../utils/checkRole');
const ObjectID = require('mongoose').Types.ObjectId;

route.get('/login', async (req, res) => {
    renderToView(req, res, 'dashboards/pages/login', {})
})

route.post('/login', async (req, res) => {
    let {email, password} = req.body;
    // console.log({username, password})

    let infoUser = await USER_MODEL.signIn(email, password);
    if (infoUser.error){
        return res.json(infoUser)
    }

    req.session.token = infoUser.data.token;
    req.session.user = infoUser.data;
    res.json({infoUser});
});

route.get('/register', (req, res) => {
    renderToView(req, res, 'dashboard/pages/add-user', {});
});

let upload = uploadMulter.fields([{name: 'identity_card_image', maxCount: 1}, {name: 'driver_license_image', maxCount: 1}]) 
let cpUpload = uploadMulter.fields([{ name: 'identity_card_image', maxCount: 1 }, { name: 'driver_license_image', maxCount: 8 }])


route.post('/register', cpUpload, async (req, res) => {
    let { username, password, email } = req.body;

    let infoUser = await USER_MODEL.insert({
        username,
        password,
        email,
    })
    res.json(infoUser);
}) 

route.get('/log-out', async (req, res) => {
    req.session.token = undefined;
    res.redirect('/users/login');
})
route.get('/remove/:carID', async (req, res) => {
    let { carID } = req.params;
    let infoAfterRemove = await CAR_COLL.remove({carID });
    console.log(infoAfterRemove);
    res.redirect('/car/list-car')
})

module.exports = route;