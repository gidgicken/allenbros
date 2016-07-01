angular.module('app').controller('questionnaireCtrl', function($scope, projectService){
  $scope.newSubmission = projectService.newSubmission;
})
