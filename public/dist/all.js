angular.module('app').controller('adminCtrl', function($scope, projects, admins, tasks, projectService){
  $scope.projects = projects.data;
  $scope.admins = admins;
  $scope.addProject = projectService.addProject;
  $scope.tasks = tasks;
  $scope.showProjectForm = false;
  $scope.showAddMenu = false;
  $scope.addProject = function(contactName, contactEmail, contactPhone, contactRole, company, companyURLs, projectDescription, goalDate){
    $scope.showProjectForm = false;
    projectService.newSubmission(contactName, contactEmail, contactPhone, contactRole, company, companyURLs, projectDescription, goalDate).then(function(){
      projectService.getProjects().then(function(s){
        if(s.data){
          $scope.projects = s.data;
          $scope.selectedProject = s.data[s.data.length - 1];
        }
      })
    })
  }
  $scope.deleteProject = function(project){
    projectService.deleteProject(project).then(function(){
      projectService.getProjects().then(function(s){
        $scope.projects = s.data;
      })
      projectService.getTasks().then(function(result){
        $scope.tasks = result;
      })
    });
  }
  $scope.addTask = function(id, text, assignee){
    projectService.addTask(id, text, assignee).then(function(result){
      projectService.getProject(result._id).then(function(s){
        $scope.selectedProject = s;
        projectService.getTasks().then(function(tasks){
          $scope.tasks = tasks;
        })
        projectService.getProjects().then(function(projects){
          $scope.projects = projects.data;
        })
      });
    });
  }

  $scope.addAdmin = function(firstName, lastName, githubUN){
    projectService.addAdmin(firstName, lastName, githubUN).then(function(){
      projectService.getAdmins().then(function(s){
        $scope.admins = s;
      })
    })
  }
  $scope.markTaskAsDeleted = function(task_id, project_id){
    projectService.markTaskAsDeleted(task_id).then(function(){
      projectService.getProject(project_id).then(function(s){
        $scope.selectedProject = s;
      })
      projectService.getTasks().then(function(tasks){
        $scope.tasks = tasks;
      })
      projectService.getProjects().then(function(projects){
        $scope.projects = projects.data;
      })
    })
  }
  $scope.markTaskAsCompleted = function(task_id, project_id){
    projectService.markTaskAsCompleted(task_id).then(function(){
      projectService.getProject(project_id).then(function(s){
        $scope.selectedProject = s;
      })
      projectService.getTasks().then(function(tasks){
        $scope.tasks = tasks;
      })
      projectService.getProjects().then(function(projects){
        $scope.projects = projects.data;
      })
    })
  }
  $scope.markTaskAsNew = function(task_id, project_id){
    projectService.markTaskAsNew(task_id).then(function(){
      projectService.getProject(project_id).then(function(s){
        $scope.selectedProject = s;
      })
      projectService.getTasks().then(function(tasks){
        $scope.tasks = tasks;
      })
      projectService.getProjects().then(function(projects){
        $scope.projects = projects.data;
      })
    })
  }
  $scope.unassignedTaskFilter = function(task){
    if(task.assignedTo) return false;
    return true;
  }
  $scope.assignedToFilter = function(task){
    if(task.assignedTo && $scope.selectedAdmin){
      if(task.assignedTo._id === $scope.selectedAdmin._id) return true;
    }
    return false;
  }
  $scope.updateSelectedProject = function(project){
    $scope.selectedProject = project;
  }
  $scope.updateSelectedAdmin = function(admin){
    $scope.selectedAdmin = admin;
  }
  $scope.toggleProjectForm = function(){
    if($scope.showProjectForm) $scope.showProjectForm = false;
    else $scope.showProjectForm = true;
    return;
  }
  $scope.toggleAddMenu = function(){
    if($scope.showAddMenu) $scope.showAddMenu = false;
    else $scope.showAddMenu = true;
    return;
  }
  $scope.closeAllMenus = function(){
    if($scope.showProjectForm)$scope.showProjectForm = false;
    if($scope.showAddMenu)$scope.showAddMenu = false;
  }
})

angular.module('app').controller('loginCtrl', function($scope){
  $scope.LogInWithGitHub = function(){
    window.location = "https://allenbros.herokuapp.com/auth/github"
  };
})

angular.module('app').controller('mainCtrl', function($scope){
  $scope.toggleMenu = function(){
    var menu = document.getElementById('main-menu');
    if(menu.style.width === ""){
      menu.style.width = "96vw";
      menu.style.height = "200px";
      menu.style.opacity = "1"
    }else{
      menu.style.width = "";
      menu.style.height = "";
      menu.style.opacity = "0";
    };
  }
  $scope.clickedPage = function(){
    var menu = document.getElementById('main-menu');
    if(menu.style.width !== ""){
      menu.style.width = "";
      menu.style.height = "";
      menu.style.opacity = "0";
    };
  }
  $scope.jumpToHome = function(){
    window.scrollTo(0, 0);
  }
  $scope.jumpToWhy = function(){
    window.scrollTo(0, screen.height * .95);
  }
  $scope.jumpToWho = function(){
    window.scrollTo(0, (screen.height * 1.8));
  }
  $scope.jumpToWhat = function(){
    window.scrollTo(0, screen.height * 2.75);
  }
  $scope.jumpToHow = function(){
    window.scrollTo(0, screen.height * 5);
  }
  window.sr = ScrollReveal({ duration: 2000, distance: '200px', scale: .6, viewFactor: .8 });
  sr.reveal('.connecting-line', 500);
  sr.reveal('#jordan-pic', 500);
  sr.reveal('#caleb-pic', 500);
  sr.reveal('#jordan-info', 500);
  sr.reveal('#caleb-info', 500);
  sr.reveal('#come-to-life', 500);
  sr.reveal('#by', 500);
  sr.reveal('#for', 5000);
})

angular.module('app').controller('questionnaireCtrl', function($scope, projectService){
  $scope.newSubmission = projectService.newSubmission;
})

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

angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: './views/admin.html',
    controller: 'adminCtrl',
    controllerAs: 'c',
    resolve: {
      projects: function(projectService){
        return projectService.getProjects();
      },
      admins: function(projectService){
        return projectService.getAdmins();
      },
      tasks: function(projectService){
        return projectService.getTasks();
      }
    }
  })
  .state('admin.project', {
    url: '/project',
    templateUrl: "./views/admin.project.html"
  })
  .state('admin.admin', {
    url: '/admin',
    templateUrl: "./views/admin.admin.html"
  })
  .state('admin.unassigned', {
    url: '/admin/unassigned',
    templateUrl: "./views/admin.unassigned.html"
  })
  .state('admin.addAdmin', {
    url: '/addadmin',
    templateUrl: "./views/admin.addadmin.html"
  })
  .state('login', {
    url: '/login',
    templateUrl: './views/login.html',
    controller: 'loginCtrl'
  })
  .state('main', {
    url: '/',
    templateUrl: './views/main.html',
    controller: 'mainCtrl'
  })
  .state('questionnaire', {
    url: '/questionnaire',
    templateUrl: './views/questionnaire.html',
    controller: 'questionnaireCtrl'
  })
  .state('thankyou', {
    url: '/thankyou',
    templateUrl: './views/thankyou.html'
  })


})
