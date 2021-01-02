let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let orderSchema = new Schema({
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'car',
        default: []
    }],
    order_detail: [{
        type: Schema.Types.ObjectId,
        ref: 'order_detail',
    }],
    total: Number,
    address: String,
    note: String,
    pay: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    status: {
        type: Number, 
        default: 0
    }
});

let ORDER_COLL = mongoose.model('order', orderSchema);
module.exports    = ORDER_COLL ;