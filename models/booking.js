let BOOKING_COLL = require('../database/booking');
let ObjectID  = require('mongoose').Types.ObjectId;

module.exports = class BOOKING extends BOOKING_COLL {
    static insert({ name, priceCar, rent, amount, total, customer, createAt, endBooking }){
        return new Promise(async resolve => {
            try {

                if(!ObjectID.isValid(rent, customer)){
                    return resolve({ error: true, message: 'params_invalid' });
                }

                let data = {
                    name, priceCar, amount, total, createAt, endBooking
                };

                let newBooking = new BOOKING_COLL(data);
                let saveBooking = await newBooking.save();

                if(!saveBooking){
                    return resolve({error: true, message:'cannot_insert_booking'});
                }               
                return resolve({error: false, message: 'insert_success', data: newBooking });
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }

    static getInfoBookingNear(){
        return new Promise(async resolve => {
            try {
                let infoBookingNear = await BOOKING_COLL.find().populate('car');
                if (!infoBookingNear){
                    return resolve({error: true, message: 'cannot_get_infoBookingNear'});
                }
                return resolve({error: false, message: 'get_list_car_success', data: infoBookingNear.pop()});
            } catch (error) {
                return resolve({error: true, message: error.message});
            }
        })
    }
    
}