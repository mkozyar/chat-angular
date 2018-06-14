'use strict';

/**
 * connectionUserController
 *
 * Description
 */

angular
    .module('chat')
    .controller('connectionUserController', connectionUserController);

    connectionUserController.$inject = ['$rootScope', 'ngDialog', '$scope', '$state', '$window', '$timeout', 'ChatService'];


function connectionUserController($rootScope, ngDialog, $scope, $state, $window, $timeout, ChatService) {

    $scope.selectedUser = $state.params.userName

    
        $scope.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    

    $scope.getUserDetails = function () {
        ChatService.getUserDetails($scope.selectedUser).then(function (data) {
            $scope.user = data.data
        })
    }

    

   

    $scope.$watch('selectedUser', function (n, o) {
        $scope.getUserDetails()
    })



}
