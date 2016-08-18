const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: Boolean
});

UserSchema.methods={
  encryptPassword: function(){
    this.password = bcrypt.hashSync(this.password, 5);
    return this.password;
  },
  authenticate: function(plainPass){
    return bcrypt.compareSync(plainPass, this.password);
  }
};

UserSchema.pre('save', function(next){
  this.encryptPassword();
  next();
});

module.exports = mongoose.model('User', UserSchema);