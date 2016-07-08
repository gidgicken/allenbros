var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  githubUN: { type: String, required: true }
})

module.exports = mongoose.model('Admin', adminSchema);
