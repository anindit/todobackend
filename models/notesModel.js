var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var notesSchema = new Schema({
  title :{
    type: String, 
    required : true
  },
  desciption : {
      type: String,       
      required : true
  },
}, {
    timestamps: true
}, { collection: 'notes' });
const Notes = mongoose.model('notes', notesSchema);
module.exports = Notes;