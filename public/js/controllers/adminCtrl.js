angular.module('app').controller('adminCtrl', function($scope, $q, projects, admins, projectService){
  $scope.projects = projects.data;
  $scope.admins = admins;
  $scope.addProject = projectService.addProject;
  // $scope.addTask = projectService.addTask;
  $scope.addTask = function(id, text){
    projectService.addTask(id, text).then(function(result){
      projectService.getProject(result._id).then(function(s){
        $scope.selectedProject = s;
      });
    });
  }
  $scope.updateSelectedProject = function(project){
    $scope.selectedProject = project;
    // $scope.selectedProjectTasks = project.tasks;
  }
})
