let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let categorySchema = new Schema({
    name: { 
        type: String,
        required: true,
        trim: true
    },
    description: String,
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'car',
        default: []
    }]
});

let Category_Coll =mongoose.model('category', categorySchema);
module.exports  = Category_Coll ;