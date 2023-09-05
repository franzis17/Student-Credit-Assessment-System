import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema

//Create new user schema for user storage
const whitelistedUsersSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email address'],
    },
    role: {
        type: String,
        default: 'user',
    },
})


export default mongoose.model('WhitelstdUser', whitelistedUsersSchema)