let CATEGORY_COLL = require('../database/category_col');
let ObjectID  = require('mongoose').Types.ObjectId;

module.exports = class CATEGORY extends CATEGORY_COLL {
    static insert({ name, description }){
        return new Promise(async resolve => {
            try {

                let data = {
                    name, description
                };

                let newCategory = new CATEGORY_COLL(data);
                let saveCategory = await newCategory.save();

                if(!saveCategory){
                    return resolve({error: true, message:'cannot_insert_car'});
                }               
                return resolve({error: false, message: 'insert_success', data: newCategory });
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
}