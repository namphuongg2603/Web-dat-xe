let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let userSchema = new Schema({
    username:  {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name: String,
    password: String,
    phone: String,
    age: String,
    email: String,
    // chứng minh nhân dân
    identity_card_image: {
        type: String,
    },
    // bằng lái xe
    driver_license_image:{
        type: String,
    },
    sex:{
        type: Number,
        // 1: Nam
        // 0: Nữ
        default: 0
    },
    status: {
        type: Number,
        default: 0
    }
});

let USER_COLL  = mongoose.model('user', userSchema);
module.exports = USER_COLL;