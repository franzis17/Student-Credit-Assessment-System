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

    curtinID: { 
        type: String,
        unique: true,
        required: true,
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
        default: 'Staff'
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    emailToken: {
        type: String
    }
})


// static sign-up method for new users
//Adding new user to database
//protected by hashing passwords - using bcrypt and salt
userSchema.statics.signup = async function(email, password, username, role, emailToken, curtinID) {

    //Validation of email and password- using validator library
    //If valid email reverse to be false
    if(!validator.isEmail(email)) {
        throw Error('Email not valid')
    }

    //If password is strong enough
    if(!validator.isStrongPassword(password)){
        throw Error('Password does not follow password guidelines: Password must be 8 characters or more and include atleast 1 capital letter, number and symbol.')
    }

    //check if email already exists in database - make it case sensitive
    /*const emailExists = await this.findOne({email})*/
    const emailExists = await this.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });
    if(emailExists) {
        throw Error('Email already in use by another account')
    }

    /* const userExists = await this.findOne({username})*/
    const userExists = await this.findOne({ username: { $regex: new RegExp('^' + username + '$', 'i') } });
    if(userExists) {
        throw Error('Username already exists')
    }

    const idExists = await this.findOne({ curtinID })
    if (idExists) {
        throw Error('ID already exists')
    }

    //Number of salt rounds: Default = 10
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, username: username, role: role, emailToken: emailToken, curtinID: curtinID})

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

    if(!user.isVerified) {
        throw Error('Email is not verified.  Please verify your email before logging in.')
    }

    return user

}

export default mongoose.model('User', userSchema)


