var mongoose = require('mongoose');
var Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0) {
  mongoose.connect(require('./connection-string'));
}


var newSchema = new Schema({
  
  'title': {
    type: String,
    required: true
  },
  'ticketPriority': {
    type: String,
    //required: true,
    default:4
  },
  'description': {
    type: String,
    required: true
  },
  'status': {
    type: String,
    default: 'open'
  },
  'reporter': { type: String },
  'assignee': { type: String },
  'createdAt': { type: Date, immutable: true, default: Date.now },
  'updatedAt': { type: Date, immutable: true, default: Date.now }

});

newSchema.pre('save', function(next){
  this.updatedAt = Date.now();
  next();
});

newSchema.pre('update', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

newSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $set: { updatedAt: Date.now() } });
});



module.exports = mongoose.model('Ticket', newSchema);
