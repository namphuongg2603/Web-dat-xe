let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let categorySchema = new Schema({

    //Tên: ví dụ.. Loại dịch vụ cho thuê xe 7 chỗ, 4 chỗ, du lịch, tự lại...
    name: { 
        type: String,
        required: true,
        trim: true
    },

    description: String,
    
    rent: [{
        type: Schema.Types.ObjectId,
        ref: 'rent',
        default: []
    }]

});

let CATEGORY_COLL = mongoose.model('category', categorySchema);
module.exports  = CATEGORY_COLL;