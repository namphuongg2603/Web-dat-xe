let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let carSchema = new Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },

    //Nhiên liệu
    fuel: { 
        type: String, 
    },

    //Hướng dẫn sử dụng
    note: { 
        type: String, 
        default : ""
    },

    //Năm sản xuất
    manufacture: Number,

    //Mô tả
    description: String,

    //Số chỗ ngồi
    slot: { 
        type: Number, 
        default : 4
    },

    //Người cho thuê
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    
    image: String,

    // Ngay tạo
    createAt: {
        type: Date, 
        default: Date.now(), //Mặc định
    },
    
    /**
     * 1: Đang hoạt động
     * 0: Ngừng hoạt động
     */
    status: {
        type: Number, 
        default : 1
    }

});

let CAR_COLL =mongoose.model('car', carSchema);
module.exports  = CAR_COLL ;