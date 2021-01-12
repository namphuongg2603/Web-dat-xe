const route = require('express').Router();
const RENT_COLL = require('../database/rent_col');
//MODELS
const  CAR_MODEL  = require('../models/car');
const  RENT_MODEL  = require('../models/rent');
const  CATEGORY_MODEL  = require('../models/category');

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const CAR_COLL = require('../database/car_col');
const CATEGORY_COLL = require('../database/category_col');
const IS_LOGIN          = require('../utils/isLogin');

const redis             = require("redis");
const client            = redis.createClient();

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
route.get('/booking',IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'website/pages/booking', {})
})

route.get('/booking/:rentID', async (req, res) => {
    let { rentID } = req.params;
    let infoRent = await RENT_MODEL.getInfo({ rentID });
    renderToView(req, res, 'website/pages/booking', { infoRent: infoRent.data });
})
route.get('/contact', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'website/pages/contact', {})
})
route.get('/cart', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'website/pages/cart', {})
})
route.get('/remove/:carID', async (req, res) => {
    let { carID } = req.params;
    let infoAfterRemove = await CAR_MODEL.remove({ carID });
    console.log(infoAfterRemove);
    res.redirect('/car/list-car')
})
route.get('/remove/:categoryID', async (req, res) => {
    let { categoryID } = req.params;
    let infoAfterRemove = await CATEGORY_MODEL.remove({ categoryID });
    console.log(infoAfterRemove);
    res.redirect('/category/list-category')
})

route.get('/cart', async (req, res) => {
    let key = "CART";
    let listCart = await client.smembers(key, async function(err, reply){
        if(err){
            console.log("Thất bại");
        }else{
            console.log(reply);
            let listProductInCart = await PRODUCT_MODEL.getListOfCart({ products: reply});
            return renderToView(req, res, 'pages/cart.ejs', {listProductInCart: listProductInCart.data})    
        }
    })
    
})

route.post('/addToCart/:productID', async (req, res) => {
    let { productID } = req.params;
    console.log({ productID });
    let key = "CART";
    let addToCart = await client.sadd(key, `${productID}`, function(err, reply){
        if(err){
            console.log("Thất bại");
        }else{
            console.log(`Đã thêm ${productID} vào giỏ hàng`);
        }
    })
});

module.exports = route;