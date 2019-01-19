const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//Before Saving, determine if you have to "hash" a password
UserSchema.pre('save', function(next){
  const user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Add a method to the schema for comparing passwords
UserSchema.methods.comparePassword = function(password, callback){
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  })
}

module.exports = mongoose.model('User', UserSchema);