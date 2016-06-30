angular.module('app').service('projectService', function($http){

  this.newSubmission = function(){
    
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
        "projectOwner": contactName
      }
    }
    return $http.post('/api/projects', newProject).then(function(){
      location.reload(); //Project succesfully added
    }, function(){
      alert('Invalid Project Submission'); //Something wrong with submission
    });
  }

  this.addTask = function(id, task){
    var newTask = {
      "task": {
        "text": task
      }
    }
    $http.put('/api/projects/' + id, newTask).then(function(){
      location.reload(); //Task succesfully added
    }, function(){
      alert('Invalid Task Submission'); //Something wrong with task submission
    });
  }
})
