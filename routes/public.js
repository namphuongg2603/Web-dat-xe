const route = require('express').Router();
const RENT_COLL = require('../database/rent_col');
//MODELS
const  CAR_MODEL  = require('../models/car');
const  RENT_MODEL  = require('../models/rent');
const  CATEGORY_MODEL  = require('../models/category');
const  BOOKING_MODEL  = require('../models/booking');
const paypal     = require('paypal-rest-sdk'); 

//MIDDLEWARE
const { renderToView }  = require('../utils/childRouting');
const CAR_COLL = require('../database/car_col');
const CATEGORY_COLL = require('../database/category_col');
const redis             = require("redis");
const client            = redis.createClient();
const IS_LOGIN          = require('../utils/isLogin');
const jwt               = require('../utils/jwt');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AS0NeXo6n7ZIFsVX1jv9Gj9jRo59rNUmmH96-U2H_8ajG7dKW7ZxtI4vN8MSU7NCpxpSR-3F1ea9KQma',
    'client_secret': 'EIDhjTNf5PbZphdS1SCGO1r2Z3Z9QNoiALveyMoaWMYb0qookkeVr3Tt9RPbulZr4f0kOi6u7JjTjkyp'
});

route.get('/booking/fail', async (req, res) => {
    res.json("Thanh toán thất bại")
})

route.get('/booking/success', async (req, res) => {
    res.render("website/pages/checkout_success");
})


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
route.get('/booking', IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'website/pages/booking', {})
})

route.get('/booking/:rentID',IS_LOGIN, async (req, res) => {
    let { rentID } = req.params;
    let infoRent = await RENT_MODEL.getInfo({ rentID });
    renderToView(req, res, 'website/pages/booking', { infoRent: infoRent.data });
});

route.get('/paypal', IS_LOGIN, async (req, res) => {
    let infoBooking = await BOOKING_MODEL.getInfoBookingNear();
    console.log(infoBooking);
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/booking/success",
            "cancel_url": "http://localhost:5000/booking/fail"
        },
        "transactions": [{
            "item_list": {
                "items":[
                    {
                      "name": `${infoBooking.data.name}`,
                      "description": "Thue xe",
                      "quantity": `${infoBooking.data.amount}`,
                      "price": `${infoBooking.data.priceCar}`,
                      "tax": "0.01",
                      "sku": "1",
                      "currency": "USD"
                    },
                  ]
            },
            "amount": {
                "currency": "USD",
                "total": `${infoBooking.data.total}`
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            payment.links.forEach(async item => {
                if(item.rel == 'approval_url'){
                    console.log("Da vao day");
                    res.redirect(item.href);
                }
            })
            console.log("Create Payment Response");
        }
    });
});

route.post('/booking/:rentID', IS_LOGIN, async (req, res) => {
    try {
        let { token } = req.session;
    let customerID;
    if(token) {
        let user = await jwt.verify(token);
        customerID = user.data._id;
    }
    let { rentID } = req.params;
    let { startBookingDate, endBookingDate, amount } = req.body;

    let infoRent = await RENT_MODEL.getInfo({ rentID });

    let price = infoRent.data.price;
    let priceParse = price.split('/')[0].slice(0, price.split('/')[0].length - 1).split(".").join("");
    let total = Number(priceParse) * Number(amount);

    //console.log({ customerID, rentID, startBookingDate, endBookingDate, amount, total });
    let infoBooking = await BOOKING_MODEL.insert({ name: infoRent.data.car.name, priceCar: priceParse, rent: rentID, amount, total, customer: customerID, createAt: startBookingDate, endBooking: endBookingDate });
    res.json(infoBooking);

    // let data = {
    //     name: infoRent.data.car.name,
    //     price: infoRent.data.price,
    //     currency: "USD",
    //     quantity: Number(amount),
    // }

    
    } catch (error) {
        res.json(error)
    }

    
});

route.get('/contact',IS_LOGIN, async (req, res) => {
    renderToView(req, res, 'website/pages/contact', {})
})

/* route.get('/cart', async (req, res) => {
    renderToView(req, res, 'website/pages/cart', {})



}) */
route.get('/giohang', async (req, res) =>{
    renderToView(req, res, 'website/pages/giohang', {})
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
    res.redirect('/category/add-category')
})  

route.get('/gio-hang', async (req, res) => {
    let key = "CART";
    let listProductInCart = [];
    let listCart = await client.smembers(key, async function(err, reply){
        if(err){
            console.log("Thất bại");
        }else{
            // console.log({ reply });
            let total = 0;
            for (let productID of reply){
                let infoProduct = await RENT_COLL.findById( productID ).populate('car');
                let a;
                a = infoProduct.price.split("đ");
                let b =  a[0].split('.').join('');
                total = Number(total) + Number(b);
                listProductInCart[listProductInCart.length] = infoProduct;
            }
            // console.log( listProductInCart );
            return renderToView(req, res, 'website/pages/giohang.ejs', { listProductInCart, total })    
        }
    })
    
})

route.post('/addToCart/:productID', async (req, res) => {
    let { productID } = req.params;
    // console.log({ productID });
    let key = "CART";
    let addToCart = await client.sadd(key, `${productID}`, function(err, reply){
        if(err){
            console.log("Thất bại");
            return res.json({error: true, message: "Add product to cart fail"})
        }else{
            console.log(`Đã thêm ${productID} vào giỏ hàng`);
            return res.json({error: false, message: "Add product to cart success"})
        }
    })
    
});

module.exports = route;