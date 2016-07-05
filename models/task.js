var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  assignedTo: { type: String, default: "unassigned" },
  dateCreated: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      'new',
      'complete',
      'deleted'
    ],
    default: 'new' },
  text: { type: String, required: true }
})

module.exports = mongoose.model('Task', taskSchema);
