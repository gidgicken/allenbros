angular.module('app').controller('adminCtrl', function($scope, $q, projects, admins, projectService){
  $scope.projects = projects.data;
  $scope.admins = admins;
  $scope.addProject = projectService.addProject;
  $scope.addTask = function(id, text){
    projectService.addTask(id, text).then(function(result){
      projectService.getProject(result._id).then(function(s){
        $scope.selectedProject = s;
      });
    });
  }
  $scope.markTaskAsDeleted = function(task_id, project_id){
    projectService.markTaskAsDeleted(task_id).then(function(){
      projectService.getProject(project_id).then(function(s){
        $scope.selectedProject = s;
      })
    })
  }
  $scope.markTaskAsCompleted = function(task_id, project_id){
    projectService.markTaskAsCompleted(task_id).then(function(){
      projectService.getProject(project_id).then(function(s){
        $scope.selectedProject = s;
      })
    })
  }
  $scope.markTaskAsNew = function(task_id, project_id){
    projectService.markTaskAsNew(task_id).then(function(){
      projectService.getProject(project_id).then(function(s){
        $scope.selectedProject = s;
      })
    })
  }
  $scope.updateSelectedProject = function(project){
    $scope.selectedProject = project;
    // $scope.selectedProjectTasks = project.tasks;
  }
})
