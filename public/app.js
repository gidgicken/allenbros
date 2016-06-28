angular.module('app', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: './views/admin.html',
    controller: 'adminCtrl',
    resolve: {
      projects: function(projectService){
        return projectService.getProjects();
      }
    }
  })


})
