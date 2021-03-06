angular.module('app').service('projectService', function($http, $q, $state){

  this.newSubmission = function(contactName, contactEmail, contactPhone, contactRole, company, companyURLs, projectDescription, goalDate){
    if(!contactName || !contactEmail || !company){
      alert('Project not submitted. Please fill out all fields');
      $state.go('main');
      return;
    }
    var projectName = company;
    var projectOwner = contactName;
    var approvalStatus = 'pending';
    var newProject = {
      "questionnaire": {
        "contactName": contactName,
        "contactEmail": contactEmail,
        "contactPhone": contactPhone,
        "contactRole": contactRole,
        "company": company,
        "companyURLs": companyURLs,
        "projectDescription": projectDescription,
        "goalDate": goalDate
      },
      "information": {
        "projectName": projectName,
        "projectOwner": contactName,
        "approvalStatus": approvalStatus
      }
    }
    return $http.post('/api/projects', newProject).then(function(){
      //location.reload(); //Project succesfully added
      console.log('successfully added to database');
    }, function(){
      console.log('Invalid Project Submission'); //Something wrong with submission
    });
  }
  this.addAdmin = function(firstName, lastName, githubUN){
    var newAdmin = {
      "firstName": firstName,
      "lastName": lastName,
      "githubUN": githubUN
    };
    return $http.post('/api/admins', newAdmin).then(function(result){
      return result;
    }, function(){
      console.log('Did not add new admin')
    })
  }
  this.getAdmins = function(){
    return $http.get('/api/admins').then(function(result){
      return result.data;
    }, function(){
      console.log('could not get admins');
    })
    // return $http({
    //   method: "GET",
    //   url: "/api/tasks"
    // }).then(function(data){
    //   var adminsArr = [];
    //   for(var i = 0; i < data.data.length; i++){
    //     if(adminsArr.indexOf(data.data[i].assignedTo) === -1) adminsArr.push(data.data[i].assignedTo);
    //   }
    //   return adminsArr;
    // })
  }

  this.getProjects = function(){
    return $http({
      method: "GET",
      url: "/api/projects"
    }).then(function(data){
      if(typeof data.data.redirect == "string") {
        window.location = "https://allenbros.herokuapp.com" + data.data.redirect;
        return;
      }
      return data;
    })
  }
  this.getProject = function(id){
    return $http.get('/api/projects/' + id).then(function(result){
      return result.data;
    }, function(){
      console.log('Invalid GET project');
      return;
    })
  }

  this.customTaskFilter = function(task){
    var showStatus = [];
    for(var i = 0; i < task_show_or_hide.length; i++){
      if(task_show_or_hide[i].show) showStatus.push(task_show_or_hide[i]);
    }
    if(showStatus.indexOf(task.status) != -1){
      return true;
    }
    return false;
  }

  this.addProject = function(contactName, contactEmail, contactPhone, contactRole, company, companyURLs, projectDescription, goalDate, projectName, projectOwner){
    var newProject = {
      "questionnaire": {
        "contactName": contactName,
        "contactEmail": contactEmail,
        "contactPhone": contactPhone,
        "contactRole": contactRole,
        "company": company,
        "companyURLs": companyURLs,
        "projectDescription": projectDescription,
        "goalDate": goalDate
      },
      "information": {
        "projectName": projectName,
        "projectOwner": contactName,
        "approvalStatus": "approved"
      }
    }
    return $http.post('/api/projects', newProject).then(function(){
      //location.reload(); //Project succesfully added
      console.log('successfully added to database');
    }, function(){
      console.log('Invalid Project Submission'); //Something wrong with submission
    });
  }

  this.deleteProject = function(project){
    if(project.tasks){
      for(var i = 0; i < project.tasks.length; i++){
        $http.delete('/api/tasks/' + project.tasks[i]._id);
      }
    }
    return $http.delete('/api/projects/' + project._id).then(function(result){
      return result.data;
    })
  }

  this.getTasks = function(){
    return $http.get('/api/tasks').then(function(result){
      return result.data;
    }, function(){
      console.log('could not get tasks');
    })
  }
  this.addTask = function(id, task, assignee){
    if(assignee){
      var newTask = {
        "task": {
          "assignedTo": assignee,
          "text": task
        }
      }
    }else{
      var newTask = {
        "task": {
          "text": task,
        }
      }
    }

    return $http.put('/api/projects/' + id, newTask).then(function(response){
      return response.data;
    }, function(){
      alert('Invalid Task Submission');
    })
  }

  // this.updateTask = function(id, taskText, assignee){
  //
  // }

  this.markTaskAsDeleted = function(task_id, project_id){
    return $http.patch('/api/tasks/' + task_id, {"status": "deleted"}).then(function(){
      return;
    }, function(){
      alert('Task could not be deleted');
    })
  }
  this.markTaskAsCompleted = function(task_id, project_id){
    return $http.patch('/api/tasks/' + task_id, {"status": "complete"}).then(function(){
      return;
    }, function(){
      alert('Task could not be marked complete');
    })
  }
  this.markTaskAsNew = function(task_id, project_id){
    return $http.patch('/api/tasks/' + task_id, {"status": "new"}).then(function(){
      return;
    }, function(){
      alert('Task could not be marked new');
    })
  }

  var task_show_or_hide = [
    {
      status: "new",
      show: true
    },
    {
      status: "complete",
      show: false
    },
    {
      status: "deleted",
      show: false
    }
  ];
  this.toggleNewTaskDisplay = function(){
    if(task_show_or_hide[0].show) task_show_or_hide[0].show = false;
    else task_show_or_hide[0].show = true;
  }
  this.toggleCompleteTaskDisplay = function(){
    if(task_show_or_hide[1].show) task_show_or_hide[1].show = false;
    else task_show_or_hide[1].show = true;
  }
  this.toggleDeletedTaskDisplay = function(){
    if(task_show_or_hide[2].show) task_show_or_hide[2].show = false;
    else task_show_or_hide[2].show = true;
  }
})
