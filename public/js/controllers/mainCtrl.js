angular.module('app').controller('mainCtrl', function($scope){
  $scope.getRandomPhrase = function(){
    var motivationalPhrases = [
      'make it happen',
      'make it amazing',
      'get started',
      'no time like the present'
    ]
    return motivationalPhrases[Math.random() * (motivationalPhrases.length)];
  }
})
