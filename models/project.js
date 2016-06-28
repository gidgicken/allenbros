var mongoose = require('mongoose');
// var Task = require('./task.js')
// var Questionnaire = require('./questionnaire.js')
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectName: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  projectOwner: { type: String, required: true },
  projectStatus: { type: String, enum: ['past', 'current', 'future'], default: 'future' },
  tasks: [{ ref: 'Task', type: Schema.Types.ObjectId }],
  projectQuestionnaire: { ref: 'Questionnaire', type: Schema.Types.ObjectId }
})

module.exports = mongoose.model('Project', projectSchema);


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


var questionnaireSchema = new Schema({
  contactName: { type: String, required: true, trim: true },
  contactEmail: { type: String, required: true, trim: true },
  contactPhone: { type: String, trim: true },
  contactRole: { type: String, trim: true },
  company: { type: String, trim: true },
  companyURLs: { type: String },
  projectDescription: { type: String },
  goalDate: { type: Date, default: '12/31/9999'}
})

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
