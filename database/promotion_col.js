let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let promotionSchema = new Schema({
    name: String,

    content: String,

    percent: Number,

    avatar: String,

    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'car'
    }],
    
    status: {
        type: Number, 
        default: 0
    }
});

let PROMOTON_COLL = mongoose.model('promotion', promotionSchema);
module.exports    = PROMOTON_COLL ;