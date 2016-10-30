var users = require('./../controllers/users.js');
var tasks = require('./../controllers/tasks.js');
var projects = require('./../controllers/projects.js');

module.exports = (app, bcrypt, io, jwt, cookie) => {
  // routes go here.
  app.post('/cookie_auth', (req, res) => {
    users.cookieAuth(req, res, bcrypt, jwt, cookie);
  });

  app.post('/login', (req, res) => {
    users.login(req, res, bcrypt, jwt, cookie);
  });

  app.post('/user', (req, res) => {
    users.create(req, res, bcrypt, jwt, cookie);
  });
}
