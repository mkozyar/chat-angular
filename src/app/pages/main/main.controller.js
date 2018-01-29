'use strict';

/**
 * mainController
 *
 * Description
 */

angular
  .module('chat')
  .controller('mainController', mainController);

mainController.$inject = ['$rootScope', '$scope', '$state', '$window', '$timeout'];



function mainController($rootScope, $scope, $state, $window, $timeout) {


  $scope.screenWidth = window.innerWidth;

  window.addEventListener("resize", windowResize);

  $scope.leftBarVisible = true
  $scope.screenWidth = window.innerWidth;

  function windowResize() {
    setTimeout(function(){
   
    $scope.screenWidth = window.innerWidth;
    $state.reload()
  })

  }




  $scope.fullLeftSideWidth = function () {
    if ($scope.leftBarVisible && $scope.screenWidth < 900) {
      return 'null-width'
    }
    if ($scope.leftBarVisible && $scope.screenWidth > 900) {
      return 'messages-area'
    } 
    else
      return 'messages-area full-width'
  }

  $scope.leftSideClass = function () {
    if ($scope.leftBarVisible && $scope.screenWidth > 900) {
      return 'left-side'

    }
    if ($scope.leftBarVisible && $scope.screenWidth < 900) {
      return 'full-width'

    }
    else {
      return 'small'

    }
  }

  $scope.toggleLeftBar = function () {
    $scope.leftBarVisible = !$scope.leftBarVisible
  }

  $scope.$watch('screenWidth', function (n, o) {
    if ($scope.screenWidth < 900) {
      $scope.leftBarVisible = false
    }
    else {
      $scope.leftBarVisible = true
    }
  })

  $scope.$watch('leftBarVisible', function (n, o) {
    
    
  })

}
