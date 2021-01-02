let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let carSchema = new Schema({
    carname: { 
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    location: [{
        type: Schema.Types.ObjectId,
        ref: 'location',
    }],
    promotion: [{
        type: Schema.Types.ObjectId,
        ref: 'promotion',
        default: []
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'category',
        default: []
    }],
    // rate: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref : 'Rate'
    // },
    note: { 
        type: String, 
        default : ""
    },
    description: String,
    price: Number,
    slot: { 
        type: Number, 
        default : 0
    },
    /**
     * 
     */
    fuel: { 
        type: Number, 
        default : 0
    },
    avatar: String,
    gallery: String,
    // Ngay tao
    createAt: {
        type: Date, 
        default: Date.now 
    },
    //Ngay chinh sua
    modifyAt: {
        type: Date, 
        default: Date.now 
    },
    /**
     * 0: chua thue
     * 1: da thue
     * 2: khong con hoat dong
     */
    status: {
        type: Number, 
        default : 0
    }

});

let Car_Coll =mongoose.model('car', carSchema);
module.exports  = Car_Coll ;