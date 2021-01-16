let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let bookingSchema = new Schema({
    name: String,

    priceCar: Number,
    
    rent: {
        type: Schema.Types.ObjectId,
        ref: 'rent',
    },

    amount: Number,

    total: Number,

    customer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },

    createAt: Date,

    endBooking: Date,

    /**
     * 1: Paypal
     * 2:
     */
    payment: {
        type: Number, 
        default: 1
    },
    
    /**
     * 0: Đang chờ xác nhận
     * 1: Đã confirm, chờ đến ngày giao
     * 2: Đã bàn giao
     */
    status: {
        type: Number, 
        default: 0
    }
});

let BOOKING_COLL = mongoose.model('booking', bookingSchema);
module.exports    = BOOKING_COLL ;