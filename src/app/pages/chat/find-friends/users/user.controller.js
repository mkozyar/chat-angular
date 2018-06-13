'use strict';

/**
 * userController
 *
 * Description
 */

angular
  .module('chat')
  .controller('userController', userController);

  userController.$inject = ['$rootScope', 'ngDialog', '$scope', '$state', '$window', '$timeout', 'ChatService'];


function userController($rootScope, ngDialog, $scope, $state, $window, $timeout, ChatService) {

 $scope.selectedUser = $state.params.userName

$scope.getUserDetails = function(){
    ChatService.getUserDetails($scope.selectedUser).then(function(data){
        $scope.user = data.data
        console.log($scope.user)
    })
}

$scope.$watch('selectedUser', function(n, o){
    $scope.getUserDetails()
})



}
