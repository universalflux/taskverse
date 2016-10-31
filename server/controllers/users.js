// require the models up here.
var mongoose = require('mongoose');
var User = mongoose.model('User');
var saltRounds = 10;
var secret = "iamnumb";

module.exports = (() => {
  return {
    // place controller methods here.
    create: (req, res, bcrypt, jwt, cookie) => {
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      req.body.token = jwt.sign( hash , secret);
      console.log("newUser has been created and is about to be searched for.");
      User.findOne({userName: req.body.userName}, (err, user) => {
        if(err) {
          console.log("Could not find user.");
        } else {
          if(user){
            res.send({error: "That user already exists in the database."});
          } else {
            User.create(req.body,(err, freshUser) => {
              if (err){
                console.log(err);
              } else {
                encodedUser = {
                  firstName: freshUser.userName,
                  lastName: freshUser.lastName,
                  userName: freshUser.userName,
                  _projects: freshUser._projects,
                  token: freshUser.token
                }
                console.log("User has been encoded and is headed to the view.");
                res.json(encodedUser);
              }
            })
          }
        }
      });

  },
  login: (req, res, bcrypt, jwt, cookie) => {
    User.findOne({userName: req.body.posUserName}, (err, found) => {
      console.log(found);
      if(err){
        console.log("User is not in the system..");
        res.send({error: "User is not in the system."});
      } else {
        bcrypt.compare(req.body.posPassword, found.password, (err, same) => {
          if(err) throw err;
          else {
            if (same == true) {
              var encryptedUser = {
                firstName: found.userName,
                lastName: found.lastName,
                userName: found.userName,
                _projects: found._projects,
                token: found.token
              };
              res.json(encryptedUser);
              console.log(encryptedUser.userName + " has been recovered and sent to the view.");
          } else {
            res.send({error: "Your username or password is incorrect"});
          }
        }
      });
    }
})
},
  cookieAuth: (req, res, bcrypt, jwt, cookie) => {
    console.log(req.body);
    User.findOne({userName: req.body.userName}, (err, cookieUser) => {
      if(err) {
        console.log('Data pulled from cookie and user has been found..');
      } else {
        console.log('User has been found, now verifying token.');
        jwt.verify(req.body.token, secret, (err, decoded) => {
          if(err) {
            console.log(err);
          } else {
          if(decoded) {
            var memoryUser = {
                firstName: cookieUser.userName,
                lastName: cookieUser.lastName,
                userName: cookieUser.userName,
                _projects: cookieUser._projects,
                token: cookieUser.token
              }
              res.json(memoryUser);
              console.log("Token sent to view");
          }
        }
        })
      }
    });
  }
}
})();
