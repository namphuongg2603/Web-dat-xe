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
    let {username, password} = req.body;
    // console.log({username, password})

    let infoUser = await USER_MODEL.signIn(username, password);
    // console.log({infoUser})
    if (infoUser.error){
        return res.json(infoUser)
    }

    req.session.token = infoUser.data.token;
    req.session.user = infoUser.data;
    res.json({infoUser});
})

route.get('/register', (req, res) => {
    renderToView(req, res, 'dashboard/pages/add-user', {});
})

let upload = uploadMulter.fields([{name: 'identity_card_image', maxCount: 1}, {name: 'driver_license_image', maxCount: 1}]) 
let cpUpload = uploadMulter.fields([{ name: 'identity_card_image', maxCount: 1 }, { name: 'driver_license_image', maxCount: 8 }])
route.post('/register', cpUpload, async (req, res) => {
    let { username, name, password, phone, age, sex, email } = req.body;
    // console.log({ username, name, password, phone, age, sex, email  });
    let infoFile = req.files;
    // console.log({ infoFile });
    // console.log(infoFile.identity_card_image);

    let infoUser = await USER_MODEL.insert({
        username: username,
        name: name,
        password: password,
        phone: phone,
        age: age,
        sex: sex,
        email: email,
        identity_card_image: infoFile.identity_card_image[0].originalname,
        driver_license_image: infoFile.driver_license_image[0].originalname,
    })

    res.json(infoUser);
}) 

route.get('/log-out', async (req, res) => {
    req.session.token = undefined;
    res.redirect('/users/login');
})

module.exports = route;