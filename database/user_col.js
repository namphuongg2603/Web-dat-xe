let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let userSchema = new Schema({
    username:  {
        type: String,
        /* unique: true, //Không trùng */
        trim: true, //Cắt khoảng trống " jdsajd "
        required: true //Bắt buộc nhập
    },

    name: String,

    password: String,

    phone: String,

    age: Number,

    email: {
        type: String,
        required: true
    },

    // chứng minh nhân dân
    identity_card_image: {
        type: String,
    },

    // bằng lái xe
    driver_license_image:{
        type: String,
    },

    /**
     * 1: Nam
     * 2: Nữ
     */
    gender:{
        type: Number,
        default: 1
    },

    role:{
        type: Number,
        default: 0
    },

    /**
     * 1: Đang hoạt động
     * 2: Ngừng hoạt động
     */
    status: {
        type: Number,
        default: 0
    }

});

let USER_COLL  = mongoose.model('user', userSchema);
module.exports = USER_COLL;