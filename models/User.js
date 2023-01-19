var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({

  'name': { type: String },
  'email': {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    }
  },
  'password': { type: String },
  'UserType': {
    type: String,
    uppercase:true,
    default: "CUSTOMER"
  },
  'UserId': {
    type: String,
    required: true
  },
  'ticketsCreated': {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Ticket"
  },
  'ticketsAssigned': {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Ticket"
  },
  'UserStatus': { type: String ,default:"APPROVED"},
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
});

newSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('User', newSchema);
