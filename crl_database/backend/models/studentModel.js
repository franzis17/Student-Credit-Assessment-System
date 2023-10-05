import mongoose from 'mongoose';


const Schema = mongoose.Schema

//Create new user schema for user storage
const studentSchema = new Schema({

    name: {
        type: String, 
        unique: true,
    },

    id: { 
        type: String,
        unique: true,
    },
    notes: {
        type: String,
        required: true,
    }

    
})

const Student = mongoose.model("Student", studentSchema);

export default Student;

