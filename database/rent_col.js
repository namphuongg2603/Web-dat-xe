let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let rentSchema = new Schema({

    //Thông tin xe
    car: {
        type: Schema.Types.ObjectId,
        ref: 'car',
    },

    //Gía cho thuê
    price: String,

    //Địa chỉ
    location: {
        type: Schema.Types.ObjectId,
        ref: 'location',
    },

    //Khuyến mãi
    promotion: [{
        type: Schema.Types.ObjectId,
        ref: 'promotion',
        default: []
    }],

    //Loại dịch vụ
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category',
        default: []
    }],
    
    //Mô tả
    description: String,
    
    image: String,

    // Ngay tao
    createAt: {
        type: Date, 
        default: Date.now 
    },
    
    /**
     * 0: Chưa cho thuê
     * 1: Đã cho thuê
     */
    status: {
        type: Number, 
        default : 0
    },

    //Người tạo dịch vụ
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    //Hotline
    hotline: String,

});

let RENT_COLL = mongoose.model('rent', rentSchema);
module.exports  = RENT_COLL ;