var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectName: { type: String, required: true, unique: true },
  dateCreated: { type: Date, default: Date.now },
  projectOwner: { type: String, required: true },
  approvalStatus: { type: String, enum: ['approved', 'declined', 'pending'], default: 'pending' },
  projectStatus: { type: String, enum: ['past', 'current', 'future'], default: 'future' },
  tasks: [{ ref: 'Task', type: Schema.Types.ObjectId }],
  projectQuestionnaire: { ref: 'Questionnaire', type: Schema.Types.ObjectId }
})

module.exports = mongoose.model('Project', projectSchema);
