let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let orderDetailSchema = new Schema({
    cars: {
        type: Schema.Types.ObjectId,
        ref: 'car',
        default: []
    },
    // count: Number,
    order: {
        type: Schema.Types.ObjectId,
        ref: 'order',
    },
    time: String,
    pickUpDate: { 
        type: Date, 
    },
    pickUpLocation: {
        type: Schema.Types.ObjectId,
        ref: 'location',
    },
    droppingOffDate: { 
        type: Date, 
    },
    // droppingOffLocation: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'location',
    // },
    status: {
        type: Number, 
        default: 0
    }
});

let ORDER_DETAIL_COLL = mongoose.model('order_detail', orderDetailSchema);
module.exports        = ORDER_DETAIL_COLL ;