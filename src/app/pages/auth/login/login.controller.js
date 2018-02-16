'use strict';

/**
 * loginController
 *
 * Description
 */

angular
  .module('chat')
  .controller('loginController', loginController);

loginController.$inject = ['$rootScope', '$scope', '$state', 'AuthService'];



function loginController($rootScope, $scope, $state, AuthService) {

    $scope.login = ''
    $scope.password = ''

$scope.signIn = function () {
  var form = {
    login: $scope.login,
    password: $scope.password
  }
    AuthService.signIn(form).then(function (res) {
     $state.go("home.chat")
    }).catch(function (res) {
    })

  
}
}
