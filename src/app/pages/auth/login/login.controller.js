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
      $rootScope.authorization = true
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      localStorage.setItem("currentUserAvatar", JSON.stringify(res.data.userAvatar));
      localStorage.setItem("connectionRequests", JSON.stringify(res.data.connectionRequests));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      

      
     $state.go("home.chat")
    }).catch(function (res) {
    })

    
}
}
