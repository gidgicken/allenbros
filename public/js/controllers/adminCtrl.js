angular.module('app').controller('adminCtrl', function($scope, projects, projectService){
  $scope.projects = projects.data;
})
