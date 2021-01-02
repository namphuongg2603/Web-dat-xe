let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

let locationSchema = new Schema({
    name: { 
        type: String, 
    },
    // district_name: {
    //     type: String, 
    // },
    // ward_name: {
    //     type: String, 
    // },
    createAt: { 
        type: Date, 
        default: Date.now 
    },
    modifyAt: { 
        type: Date, 
        default: Date.now 
    }
    
});

let LOCATION_COLL = mongoose.model('location', locationSchema);
module.exports    = LOCATION_COLL ;