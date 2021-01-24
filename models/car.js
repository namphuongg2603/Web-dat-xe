let CAR_COLL = require('../database/car_col');
let ObjectID  = require('mongoose').Types.ObjectId;

module.exports = class CAR extends CAR_COLL {
    static insert({ name, fuel, note, manufacture, description, slot, owner, image }){
        return new Promise(async resolve => {
            try {

                if(!ObjectID.isValid(owner)){
                    return resolve({ error: true, message: 'params_invalid' });
                }

                let data = {
                    name, fuel, note, manufacture, description, slot, owner
                };

                if(image){
                    data.image = image;
                }

                let newCar = new CAR_COLL(data);
                let saveCar = await newCar.save();

                if(!saveCar){
                    return resolve({error: true, message:'cannot_insert_car'});
                }               
                return resolve({error: false, message: 'insert_success', data: newCar });
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getList(){
        return new Promise(async resolve => {
            try {
                let listCar = await CAR_COLL.find({});
                if (!listCar){
                    return resolve({error: true, message: 'cannot_get_listCar'});
                }
                return resolve({error: false, message: 'get_list_car_success', data: listCar});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfo(id){
        return new Promise(async resolve => {
            try {
                let infoCar = await CAR_COLL.findById(ObjectID(id));
                if(!infoCar){
                    return resolve({error: true, message:'not_found_infoCar'});
                }
                return resolve({error: false, message:'get_info_success', data: infoCar});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    static update({id, carname, owner, category, description, status}) {
        return new Promise(async resolve => {
            try {
                
                if(!ObjectID.isValid(id)){
                    return resolve({error: true, message:'params_invalid'});
                }
                let listCar = await CAR_COLL.findByIdAndUpdate(id,{
                    carname, owner, category, description, status
                }
                ,{
                    new: true
                });
                
                if(!listCar){
                    return resolve({error: true, message:'cannot_update_list'});
                }
                return resolve({error: false, message:'update_data_success', data: listCar});


            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    static remove({ carID }){
        return new Promise(async resolve => {
            try {
                let listCarForRemove = await CAR_COLL.findByIdAndDelete(carID);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }
    //Lay danh sách sản phẩm theo ID
    static getListOfCart({ products }) {
        return new Promise(async resolve => {
            try {

                let listProduct = [];
                for(let productID of products) {
                    let infoProduct = await PRODUCT_COLL.findById(productID);
                    if (!infoProduct) 
                        return resolve({ error: true, message: 'cannot_get_list_data' });
                    listProduct[listProduct.length] = (infoProduct)
                }
                
                return resolve({ error: false, data: listProduct });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    
    
}