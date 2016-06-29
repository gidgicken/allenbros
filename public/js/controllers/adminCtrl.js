angular.module('app').controller('adminCtrl', function($scope, projects, projectService){
  $scope.projects = projects.data;
  $scope.addProject = projectService.addProject;
  $scope.addTask = projectService.addTask;
})
