var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slotSchema = new Schema({
  slotnumber :{
    type: String, 
    required : true
  },
  booked :{
    type: Number, default: 0
  },
  created: Date,
}, {
    timestamps: true
});
var collectionName = 'slot';
const Slot = mongoose.model('slot', slotSchema,collectionName);
module.exports = Slot;