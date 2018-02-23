'use strict';

/**
 * registrationController
 *
 * Description
 */

angular
  .module('chat')
  .controller('registrationController', registrationController);

registrationController.$inject = ['$rootScope', '$scope', '$state', 'AuthService'];



function registrationController($rootScope, $scope, $state, AuthService) {

  $scope.login = ''
  $scope.password = ''
  $scope.confirmPassword = ''
  $scope.email = ''

  $scope.register = function () {
    var hashedPassword = CryptoJS.HmacSHA1($scope.password, "SecretKey").toString()
    var form = {
      "login": $scope.login,
      "email": $scope.email,
      "password": hashedPassword
    }

    AuthService.register(form).then(
      function (data) {
          $scope.login = ''
          $scope.password = ''
          $scope.confirmPassword = ''
          $scope.email = ''
          $state.go("home.login")
      })
  }
}
