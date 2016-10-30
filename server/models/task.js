var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TaskSchema = new Schema ({
  task: String,
  completed: Boolean,
  _user: {type: Schema.Types.ObjectId, ref:'User'},
  _project: {type: Schema.Types.ObjectId, ref:'Project'}
});

mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
