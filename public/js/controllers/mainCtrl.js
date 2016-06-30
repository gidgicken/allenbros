angular.module('app').controller('mainCtrl', function($scope){
  $scope.toggleMenu = function(){
    var menu = document.getElementById('main-menu');
    if(menu.style.width === ""){
      menu.style.width = "96vw";
      menu.style.height = "200px";
      menu.style.opacity = "1"
    }else{
      menu.style.width = "";
      menu.style.height = "";
      menu.style.opacity = "0";
    };
  }
  window.sr = ScrollReveal({ duration: 2000, distance: '200px', scale: .6, viewFactor: .8 });
  sr.reveal('.connecting-line', 500);
  sr.reveal('#jordan-pic', 500);
  sr.reveal('#caleb-pic', 500);
  sr.reveal('#jordan-info', 500);
  sr.reveal('#caleb-info', 500);
  sr.reveal('#come-to-life', 500);
  sr.reveal('#by', 500);
  sr.reveal('#for', 5000);
})
