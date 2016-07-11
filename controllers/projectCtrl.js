var Project = require('../models/project.js');
var Questionnaire = require('../models/questionnaire.js');
var Task = require('../models/task.js')
var Admin = require('../models/admin.js')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nodemailer = require('nodemailer');

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'bros.allen@gmail.com',
        pass: 'brothersallen'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

var mailOptions = {
    from: '"AllenBros" <bros.allen@gmail.com>', // sender address
    to: 'doydle@gmail.com', // list of receivers
    subject: 'New Project Submission', // Subject line
    html: '<p>A new project has been submitted to Allen Bros</p><br>">Click here to view</a>', // plaintext body
};

module.exports = {

  addProject: function(req, res, next){
    var newProject = new Project(req.body.information);
    newProject.tasks = [];
    var projectQuestionnaire = new Questionnaire(req.body.questionnaire);
    projectQuestionnaire.save(function(err){
      console.log('1');
      if(err) return res.status(500).json(err);
    })
    newProject.projectQuestionnaire = projectQuestionnaire._id;
    newProject.save(function(err, s){
      console.log('2');
      if(err) return res.status(500).json(err);
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);
      });
      return res.json(s);
    })
  },
  getProjects: function(req, res, next){
    Project.find({})
      // .populate('tasks')
      .populate({
        path: 'tasks',
        populate: { path: 'assignedTo'}
      })
      .populate('projectQuestionnaire')
      .exec(function(err, s){
        // console.log(s);
        if(err) return res.status(500).json(err);
        return res.json(s);
    })
  },
  getProjectById: function(req, res, next){
    if(!req.params.id){
      return res.status(400).json('id query needed');
    }
    console.log('1');
    Project.findOne({'_id': req.params.id})
      // .populate('tasks')
      .populate({
        path: 'tasks',
        populate: { path: 'assignedTo'}
      })
      .populate('projectQuestionnaire')
      .exec(function(err, s){
        if(err) return res.status(500).json(err);
        console.log('2');

        return res.json(s);
      })
  },
  deleteProjectById: function(req, res, next){
    if(!req.params.id){
      return res.status(400).json('id query needed');
    }
    Project.findByIdAndRemove({'_id': req.params.id}).exec(function(err, s){
      if(err) return res.status(500).json(err);
      return res.json(s);
    })
  },
  updateProjectById: function(req, res, next){
    Project.findByIdAndUpdate(req.params.id, {}, function(err, project){
      console.log('1');
      if(err) return res.status(500).json(err);
      console.log('2');

      if(req.body.task){
        var newTask = new Task(req.body.task);
        newTask.save(function(err){
          console.log('3');
          if(err) return res.status(500).json(err);
        })
        project.tasks.push(newTask._id);
        project.save(function(err, s){
          console.log('4');

          if(err) return res.status(500).json(err);
          console.log('5');

          return res.json(project);
        })
      }
    })
  },
  getTasks: function(req, res, next){
    Task.find({})
    .populate('assignedTo')
      .exec(function(err, s){
        if(err) return res.status(500).json(err);
        return res.json(s);
    })
  },
  patchTaskById: function(req, res, next){
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, s){
      if(err) return res.status(500).json(err);
      return res.json(s);
    })
  },
  deleteTaskById: function(req,res,next) {
    Task.findByIdAndRemove({'_id': req.params.id}).exec(function(err, s){
      if(err) return res.status(500).json(err);
      return res.json(s);
    })
  },
  getAdmins: function(req,res,next){
    Admin.find().exec(function(err, s){
      if(err) return res.status(500).json(err);
      return res.json(s);
    })
  },
  addAdmin: function(req, res, next){
    var newAdmin = new Admin(req.body);
    newAdmin.save(function(err, s){
      if(err) return res.status(500).json(err);
      return res.json(s);
    })
  }
}
