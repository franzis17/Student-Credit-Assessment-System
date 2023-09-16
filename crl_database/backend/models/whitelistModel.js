import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema

//Create new user schema for user storage
const whitelistedUsersSchema = new Schema({

    curtinID: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // Convert the number to string and check if it's numeric and of length 8
                return validator.isNumeric(String(v)) && String(v).length === 8;
            },
            message: 'Invalid Curtin ID for user'
        }
    },
    role: {
        type: String,
        default: 'Staff',
    },
})


export default mongoose.model('WhitelstdUser', whitelistedUsersSchema)