var Project = require('../models/project.js');
var Questionnaire = require('../models/questionnaire.js');
var Task = require('../models/task.js')

module.exports = {
  addProject: function(req, res, next){
    var newProject = new Project(req.body.information);
    newProject.tasks = [];
    newProject.projectQuestionnaire = new Questionnaire(req.body.questionnaire);
    newProject.save(function(err, s){
      return err ? res.status(500).json(err) : res.json(s);
    })
  },
  getProjects: function(req, res, next){
    // Project.find({}, function(err, s){
    //   if(err) return res.status(500).json(err);
    //   // s.populate('tasks');
    //   return res.json(s);
    // })
    Project.find({})
      //.populate('tasks')
      //.populate('projectQuestionnaire')
      .exec(function(err, s){
        console.log(s);
        if(err) return res.status(500).json(err);
        return res.json(s);
    })
  },
  getProjectById: function(req, res, next){
    if(!req.params.id){
      return res.status(400).json('id query needed');
    }
    Project.findOne({'_id': req.params.id}).exec(function(err, s){
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
          project.tasks.push(new Task(req.body.task));
          project.save(function(err, s){
            if(err) return res.status(500).json(err);
            return res.json(project);
          })
      }
    })
  }
}
