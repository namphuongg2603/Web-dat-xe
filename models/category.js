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
    static remove({ categoryID }) {
        return new Promise(async resolve => {
            try {

                if (!ObjectID.isValid(categoryID))
                    return resolve({ error: true, message: 'params_invalid' });

                let infoAfterRemove = await (await CATEGORY_COLL.findByIdAndDelete(categoryID)).populate('sub_categorys');

                if (!infoAfterRemove)
                    return resolve({ error: true, message: 'cannot_remove_data' });

                //Xóa tất cả category con thuộc category cha
                await CATEGORY_COLL.deleteMany({category : categoryID});

                //Xóa tất cả product trong category cha
                if(infoAfterRemove.sub_categorys && infoAfterRemove.sub_categorys.length){
                    infoAfterRemove.sub_categorys.forEach(async subItem => {
                        await PRODUCT_COLL.deleteMany({
                            category: subItem._id
                        })
                    })
                }

                return resolve({ error: false, data: infoAfterRemove, message: "remove_data_success" });
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
}