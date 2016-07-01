angular.module('app').controller('adminCtrl', function($scope, projects, admins, projectService){
  $scope.projects = projects.data;
  $scope.admins = admins;
  $scope.addProject = projectService.addProject;
  $scope.addTask = projectService.addTask;
  $scope.toggleSideMenu = function(){
    var sideMenu = document.getElementById('side-menu');
    if(sideMenu.style.marginLeft === "-22vw"){
      sideMenu.style.marginLeft = "-2vw";
    }else{
      sideMenu.style.marginLeft = "-22vw";
    }
  }
})
