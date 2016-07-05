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
      }
    }
  })
  .state('admin.project', {
    url: '/project',
    templateUrl: "./views/admin.project.html"
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


})
