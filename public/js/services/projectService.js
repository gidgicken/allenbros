angular.module('app').service('projectService', function($http){
  this.getProjects = function(){
    return $http({
      method: "GET",
      url: "/api/projects"
    }).then(function(data){
      return data;
    })
  }
})
