'use strict';

/**
 * registrationController
 *
 * Description
 */

angular
  .module('chat')
  .controller('registrationController', registrationController);

registrationController.$inject = ['$rootScope', '$scope', '$state', 'AuthService', 'ChatService'];



function registrationController($rootScope, $scope, $state, AuthService, ChatService) {

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
    var chatForm = {
      chatName: $scope.login
    }
    AuthService.register(form).then(
      function (data) {
        $scope.login = ''
        $scope.password = ''
        $scope.confirmPassword = ''
        $scope.email = ''
        $state.go("home.login")
      })
    ChatService.createChat(chatForm).then(function () {
    })
  }
}
