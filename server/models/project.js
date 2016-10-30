var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  summary: String,
  tasks: [{type: Schema.Types.ObjectId, ref:'Task'}],
  _users: [{type: Schema.Types.ObjectId, ref:'User'}]
});

mongoose.model('Project', ProjectSchema);
var Project = mongoose.model('Project');
