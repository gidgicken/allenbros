angular.module('app').service('projectService', function($http, $q){

  this.newSubmission = function(contactName, contactEmail, contactPhone, contactRole, company, companyURLs, projectDescription, goalDate){
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

  this.getAdmins = function(){
    return $http({
      method: "GET",
      url: "/api/tasks"
    }).then(function(data){
      var adminsArr = [];
      for(var i = 0; i < data.data.length; i++){
        if(adminsArr.indexOf(data.data[i].assignedTo) === -1) adminsArr.push(data.data[i].assignedTo);
      }
      return adminsArr;
    })
  }

  this.getProjects = function(){
    return $http({
      method: "GET",
      url: "/api/projects"
    }).then(function(data){
      if(typeof data.data.redirect == "string") {
        window.location = "http://localhost:3000" + data.data.redirect;
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

  this.addTask = function(id, task){
    var newTask = {
      "task": {
        "text": task
      }
    }
    // return $http.put('/api/projects/' + id, newTask).then(function(response){
    //
    // }, function(){
    //   alert('Invalid Task Submission'); //Something wrong with task submission
    // });

    return $http.put('/api/projects/' + id, newTask).then(function(response){
      return response.data;
    }, function(){
      alert('Invalid Task Submission');
    })
  }
})
