'use strict';

/**
 * loginController
 *
 * Description
 */

angular
  .module('chat')
  .controller('loginController', loginController);

loginController.$inject = ['$rootScope', '$scope', '$state', 'AuthService', 'jwtHelper'];



function loginController($rootScope, $scope, $state, AuthService, jwtHelper) {

    $scope.login = ''
    $scope.password = ''

$scope.signIn = function () {
  var hashedPassword = CryptoJS.HmacSHA1($scope.password, "SecretKey")
  var form = {
    login: $scope.login,
    password: hashedPassword.toString()
  }
  
    AuthService.signIn(form).then(function (res) {
      var currentUser = jwtHelper.decodeToken(res)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      
     $state.go("home.chat")
    }).catch(function (res) {
    })

  
}
}
