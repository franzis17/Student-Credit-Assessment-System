import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema

//Create new user schema for user storage
const whitelistedUsers = new Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        default: 'user'
    }
})

userSchema.statics.whitelistedUsers = async function(email, role) {

    //Validation of email and password- using validator library
    //If valid email reverse to be false
    if(!validator.isEmail(email)) {
        throw Error('Email not valid')
    }

    //check if email already exists in database
    const emailExists = await this.findOne({email})

    if(emailExists) {
        throw Error('Email already in use by another account')
    }

    const whiteListedUser = await this.create({email, role})

    return whiteListedUser


}
