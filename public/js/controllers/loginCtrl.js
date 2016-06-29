angular.module('app').controller('loginCtrl', function($scope){
  $scope.LogInWithGitHub = function(){
    window.location = "http://localhost:3000/auth/github"
  };
})
