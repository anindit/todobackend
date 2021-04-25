var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({

  email :{
    type: String, 
    required : true
  },
  password : {
      type: String,       
      required : true
  },
}, {
    timestamps: true
});
var collectionName = 'usertb';
const User = mongoose.model('usertb', userSchema,collectionName);
module.exports = User;