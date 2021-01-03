let RENT_COLL = require('../database/rent_col');
let ObjectID  = require('mongoose').Types.ObjectId;

module.exports = class RENT extends RENT_COLL {
    static insert({ car, price, location, promotion, category, description, image, owner, hotline }){
        return new Promise(async resolve => {
            try {

                if(!ObjectID.isValid(car, category)){
                    return resolve({ error: true, message: 'params_invalid' });
                }

                let data = {
                    car, price, category, description, image, owner, hotline
                };

                if(image){
                    data.image = image;
                }

                if(location){
                    data.location = location;
                }

                if(promotion){
                    data.promotion = promotion;
                }

                if(category){
                    data.category = category;
                }

                let newCar = new RENT_COLL(data);
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
                let listRent = await RENT_COLL.find().populate('car');
                if (!listRent){
                    return resolve({error: true, message: 'cannot_get_listRent'});
                }
                return resolve({error: false, message: 'get_list_car_success', data: listRent });
            } catch (error) {
                return resolve({error: true, message: error.message });
            }
        })
    }

    static getInfo({ rentID }){
        return new Promise(async resolve => {
            try {
                let infoRent = await RENT_COLL.findById(rentID).populate('car');
                if(!infoRent){
                    return resolve({error: true, message:'not_found_infoCar'});
                }
                return resolve({error: false, message:'get_info_success', data: infoRent });
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

    static remove(id){
        return new Promise(async resolve => {
            try {
                let listCarForRemove = await CAR_COLL.findByIdAndDelete(id);
                return resolve({error: false, message:'remove_success'});
            } catch (error) {
                return resolve({ error: true, message: error.message });
            }
        })
    }

    
    
}