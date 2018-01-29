'use strict';

/**
 * mainController
 *
 * Description
 */

angular
  .module('chat')
  .controller('mainController', mainController);

mainController.$inject = ['$rootScope', '$scope', '$state', '$window'];


function mainController($rootScope, $scope, $state) {
console.log($(window).width())
  $scope.screenWidthF = function(event) {
    $scope.screenWidth = event.target.innerWidth;
  }
  $scope.leftBarVisible = true

  $scope.toggleLeftBar = function () {
    $scope.leftBarVisible = !$scope.leftBarVisible
  }

  $scope.$watch('screenWidth', function (n, o) {
    console.log($scope.screenWidth)
  })

}
