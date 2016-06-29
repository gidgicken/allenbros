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
  window.sr = ScrollReveal({ duration: 2000, distance: '200px', scale: .6, viewFactor: 1 });
  sr.reveal('.knowledge-logo', 500);
  sr.reveal('.connecting-line', 500);
})
