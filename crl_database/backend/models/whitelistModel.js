import mongoose from 'mongoose';
import validator from 'validator';

const Schema = mongoose.Schema

//Create new user schema for user storage
const whitelistedUsersSchema = new Schema({

    curtinID: {
        type: Number,
        required: true,
        unique: true,
        /*validate: {
            validator: function(v) {
                // Convert the number to string and check if it's numeric and of length 8
                return validator.isNumeric(String(v)) && String(v).length === 8;
            },
            message: 'Invalid Curtin ID for user'
        }*/
    },
    role: {
        type: String,
        default: 'Staff',
    },
})


export default mongoose.model('WhitelstdUser', whitelistedUsersSchema)


/* validate: {
    validator: function(v) {
       
        return /^[0-9]{6}.$/.test(String(v));
    },
    message: props => `${props.value} is not a valid format. Expected: 6 digits followed by any character.`
    
    Front end

    function isValidCurtinID(value) {
    return /^[0-9]{6}.$/.test(value);
}


if (!isValidCurtinID(curtinID)) {
    console.error("Invalid Curtin ID format");
} */