// require the models up here.
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

module.exports = (function () {
  return {
    // place controller methods here.
    create: (req, res, bcrypt, jwt, cookie) => {
      console.log(req.body);
      newProject = {
        name: req.body.name
      };
      Project.create(newProject, (err, created) => {
        if(err){
            console.log("Project couldn't be created.");
          } else {
            console.log(created + " success! Now going to deliver all the projects.");
            Project.find({}, (err, all) => {
                if (err) {
                  console.log("Couldn't recover projects.");
                } else {
                  res.json(all);
                }
              });
            }
          });
      },
      getOne: (req, res, bcrypt, jwt, cookie) => {
        Project.findOne(req.body, (err, project) => {
          if(err){
            console.log("Could not locate project.");
          } else {
            res.json(project);
            console.log(project);
          }
        });
      },
      getAll: (req, res, bcrypt, jwt, cookie) => {
        Project.find().sort({updatedAt:-1}).exec((err, all) => {
            if (err) {
              console.log("Couldn't recover all projects.");
            } else {
              res.json(all);
            }
          })
        }
      }
})();
