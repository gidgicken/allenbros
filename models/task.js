var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  assignedTo: { type: String },
  dateCreated: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      'new',
      'in progress',
      'complete'
    ],
    default: 'new' },
  text: { type: String, required: true }
})

module.exports = mongoose.model('Task', taskSchema);
