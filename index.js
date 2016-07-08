var express = require('express');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var nodemailer = require('nodemailer');
//
// var smtpConfig = {
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // use SSL
//     auth: {
//         user: 'bros.allen@gmail.com',
//         pass: 'brothersallen'
//     }
// };
//
// var transporter = nodemailer.createTransport(smtpConfig);
//
// var mailOptions = {
//     from: '"AllenBros" <bros.allen@gmail.com>', // sender address
//     to: 'doydle@gmail.com', // list of receivers
//     subject: 'New Project Submission', // Subject line
//     text: 'A new project has been submitted to Allen Bros', // plaintext body
// };
//
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });

var GitHubStrategy = require('passport-github').Strategy;

var Project = require('./models/project.js');
var Questionnaire = require('./models/questionnaire.js');
var Task = require('./models/task.js');
var Admin = require('./models/admin.js')


var projectCtrl = require('./controllers/projectCtrl.js');

mongoose.connect('mongodb://localhost/allenbros');

var adminsArr = ['gidgicken', 'caleb-allen']; //THIS SUCKS. CHANGE WHEN YOU CAN

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'j0rdan1stoohawt2handl3',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var requireAuth = function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('START START START START START START')
      console.log(req.user.username);
      if(adminsArr.indexOf(req.user.username) != -1) return next();
    }
    console.log('USER IS NOT ADMIN')
    return res.send({redirect: '/#/login'})
}

// var requireABAuth = function(req,res,next){
//   console.log('here');
//   var adminsArr = projectCtrl.getAdminsGithubUN(req,res,next);
//   console.log('Hello');
//   return next();
// }

passport.use(new GitHubStrategy({
  clientID: '6c808f44be286cc277b0',
  clientSecret: '8d0b741bb7630518369cf581310eed11af25ee6f',
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile)
}));

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/#/admin',
  failureRedirect: '/#/login'
}));


app.post('/api/projects', projectCtrl.addProject);
app.get('/api/projects', requireAuth, projectCtrl.getProjects);
app.get('/api/projects/:id', projectCtrl.getProjectById);
app.delete('/api/projects/:id', projectCtrl.deleteProjectById);
app.put('/api/projects/:id', projectCtrl.updateProjectById);

app.get('/api/tasks', projectCtrl.getTasks);
app.patch('/api/tasks/:id', projectCtrl.patchTaskById);

app.get('/api/admins', projectCtrl.getAdmins);
app.post('/api/admins', projectCtrl.addAdmin);





var port = 3000;
app.listen(port, function() {
  console.log("Started server on port", port);
});
