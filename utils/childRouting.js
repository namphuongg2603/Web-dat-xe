const jwt               = require('./jwt');
const moment            = require('moment');
const  USER_MODEL  = require('../models/user_mod');
const  CATEGORY_MODEL  = require('../models/category');
const  RENT_MODEL  = require('../models/rent');
const  CAR_MODEL  = require('../models/car');

let renderToView = async function(req, res, view, data) {
    let { token } = req.session;

    if(token) {
        let user = await jwt.verify(token);
        data.infoUser = user.data;
    } else {
        data.infoUser = undefined;
    }

    let listRent = await RENT_MODEL.getList();
    let listCategory = await CATEGORY_MODEL.getList();
    let listCar = await CAR_MODEL.getList();

    data.moment         = moment;
    data.listRent       = listRent.data;
    data.listCategory   = listCategory.data;
    data.listCar   = listCar.data;
    

    return res.render(view, data);
}
exports.renderToView = renderToView;