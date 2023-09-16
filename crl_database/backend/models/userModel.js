import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema

//Create new user schema for user storage
const userSchema = new Schema({

    username: {
        type: String, 
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        unique: false
    },

    role: {
        type: String,
        default: 'user'
    }
})


// static sign-up method for new users
//Adding new user to database
//protected by hashing passwords - using bcrypt and salt
userSchema.statics.signup = async function(email, password, username) {

    //Validation of email and password- using validator library
    //If valid email reverse to be false
    if(!validator.isEmail(email)) {
        throw Error('Email not valid')
    }

    //If password is strong enough
    if(!validator.isStrongPassword(password)){
        throw Error('Password does not follow password guidelines: Password must be 8 characters or more and include atleast 1 capital letter, number and symbol')
    }

    //check if email already exists in database
    const emailExists = await this.findOne({email})
    if(emailExists) {
        throw Error('Email already in use by another account')
    }

    const userExists = await this.findOne({username})
    if(userExists) {
        throw Error('Username already exists')
    }

    //Number of salt rounds: Default = 10
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, username: username})

    return user


}

//static login method
userSchema.statics.login= async function(email, password) {

    if(!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Invalid Login Credentials')
    }

    //Find matching password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid Login Credentials')
    }

    return user

}

export default mongoose.model('User', userSchema)


