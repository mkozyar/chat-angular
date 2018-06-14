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
  $scope.currentUserAvatar = JSON.parse(localStorage.getItem("currentUserAvatar"))
  $scope.logout = function () {
    localStorage.removeItem("token");
    setTimeout(function () {
      $rootScope.authorization = false
      $state.go("home.login")
    }, 1000)
  }
}
