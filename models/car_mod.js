let CAR_COLL = require('../database/user_col');
let ObjectID  = require('mongoose').Types.ObjectId;

const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../utils/jwt');

module.exports = class CAR extends CAR_COLL {
    static insert({ carname, owner, location, promotion, category, note, description, slot, fuel, avatar, gallery, createAt, modifyAt, status }){
        return new Promise(async resolve => {
            try {
                let option = {};
                option.carname     = carname;
                option.owner       = owner;
                option.location    = location;
                option.promotion   = promotion;
                option.category    = category;
                option.note        = note;
                option.description = description;
                if( slot ){
                    option.slot = slot;
                }
                if( fuel ){
                    option.fuel = fuel;
                }
                if( avatar ){
                    option.avatar = avatar;
                }
                if( gallery ){
                    option.gallery = gallery;
                }
                if( createAt ){
                    option.createAt = createAt;
                }if( modifyAt ){
                    option.modifyAt = modifyAt;
                }if( status ){
                    option.status = status;
                }


                // console.log({option});
                let infoCar = await CAR_COLL.findOne({ carname });
                if (infoCar) {
                    return resolve({error: true, message: 'exist'})
                }

                let newCar = new CAR_COLL(option);
                let saveCar = await  newCar.save();
                console.log({newCar});

                // let infoCategoryAfterInsert = await newUser.save();
                if(!saveCar){
                    return resolve({error: true, message:'cannot_insert_car'});
                }               
                return resolve({error: false, message: 'insert_success'});
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
                let infoCar = await CAR_COLL.findById(id);
                if(!infoCar){
                    return resolve({error: true, message:'not_found_infoCar'});
                }
                return resolve({error: false, message:'get_info_success'});
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