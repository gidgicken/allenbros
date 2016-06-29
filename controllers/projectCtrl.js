var Project = require('../models/project.js');
var Questionnaire = require('../models/questionnaire.js');
var Task = require('../models/task.js')

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
  addProject: function(req, res, next){
    var newProject = new Project(req.body.information);
    newProject.tasks = [];
    var projectQuestionnaire = new Questionnaire(req.body.questionnaire);
    projectQuestionnaire.save(function(err){
      if(err) res.status(500).json(err);
    })
    newProject.projectQuestionnaire = projectQuestionnaire._id;
    newProject.save(function(err, s){
      return err ? res.status(500).json(err) : res.json(s);
    })
  },
  getProjects: function(req, res, next){
    Project.find({})
      .populate('tasks')
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
    Project.findOne({'_id': req.params.id})
      .populate('tasks')
      .populate('projectQuestionnaire')
      .exec(function(err, s){
        if(err) return res.status(500).json(err);
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

      if(err) return res.status(500).json(err);

      if(req.body.task){
        var newTask = new Task(req.body.task);
        newTask.save(function(err){
          if(err) return res.status(500).json(err);
        })
        project.tasks.push(newTask._id);
        project.save(function(err, s){
          if(err) return res.status(500).json(err);
          return res.json(project);
        })
      }
    })
  }
}
