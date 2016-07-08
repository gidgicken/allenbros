angular.module('app').controller('loginCtrl', function($scope){
  $scope.LogInWithGitHub = function(){
    window.location = "https://allenbros.herokuapp.com/auth/github"
  };
})
