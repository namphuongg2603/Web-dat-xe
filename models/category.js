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

    static getList(){
        return new Promise(async resolve => {
            try {
                let listCategory = await CATEGORY_COLL.find();
                if (!listCategory){
                    return resolve({error: true, message: 'cannot_get_listCategory'});
                }
                return resolve({error: false, message: 'get_list_car_success', data: listCategory });
            } catch (error) {
                return resolve({error: true, message: error.message });
            }
        })
    }
    static remove({ categoryID }){
        return new Promise(async resolve => {
            try {
                let listCategoryForRemove = await CATEGORY_COLL.findByIdAndDelete(categoryID);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}