var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  summary: String,
  tasks: Array,
  _users: [{type: Schema.Types.ObjectId, ref:'User'}]
},
{
  timestamps: true
});

mongoose.model('Project', ProjectSchema);
var Project = mongoose.model('Project');
