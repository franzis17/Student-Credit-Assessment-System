const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * User schema used to represent the user entity
 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: String
});
const User = mongoose.model('User', userSchema);

/**
 * Institution schema used to represent the unit entity
 */
const institutionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  status: String,
  aqf: String,
  createdAt: { type: Date, default: Date.now }
});

const Institution = mongoose.model('Institution', institutionSchema);

/**
 * Unit schema used to represent the unit entity
 */
const unitSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  address: String,
  institution: {
    type: ObjectId, 
    ref: 'institution'
  },
  statusColor: String,
  userId: { type: ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const Unit = mongoose.model('Unit', unitSchema);

/**
 * Note schema used to represent the unit entity
 */
const noteSchema = new mongoose.Schema({
  content: String,
  noteId: { type:ObjectId, ref:'note' },
  createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = {
  User,
  Institution,
  Unit,
  Note
};