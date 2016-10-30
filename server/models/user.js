var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  userName: String,
  password: String,
  token: String,
  _tasks: [{type:Schema.Types.ObjectId, ref:'Task'}],
  _projects: [{type:Schema.Types.ObjectId, ref:'Project'}]
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
// User.create({firstName: 'Bill', lastName: 'Chad', email: 'Dunkin', userName: 'String', password: 'Okie'}, (err, person) =>{
//   if (err) {
//     console.log('User not created')
//   } else {
//     console.log(person);
//   };
// });
