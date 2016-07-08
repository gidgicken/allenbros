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
    // projectService.addTask(id, text, assignee).then(function(result){
    //   // projectService.getProject(result._id).then(function(s){
    //     $scope.selectedProject = result;
    //   // });
    // });
  }
  // $scope.updateTask = function(id, taskText, assignee){
  //   projectService.updateTask(id, taskText, assignee).then(function(result){
  //     projectService.getProject(result._id).then(function(s){
  //       $scope.selectedProject = s;
  //     })
  //   })
  // }
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
  // $scope.toggleAddAdminForm = function(){
  //   if($scope.showAddAdminForm) $scope.showAddAdminForm = false;
  //   else $scope.showAddAdminForm = true;
  //   return;
  // }
})
