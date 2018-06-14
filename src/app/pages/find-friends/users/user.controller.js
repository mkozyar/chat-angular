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

    
        $scope.currentUser = JSON.parse(localStorage.getItem("currentUser"))
    

    $scope.getUserDetails = function () {
        ChatService.getUserDetails($scope.selectedUser).then(function (data) {
            $scope.user = data.data
        })
    }

    $scope.addToFriends = function () {
        ChatService.addToFriends($scope.currentUser, $scope.selectedUser).then(function (data) {
            $state.reload()
        })
    }

    $scope.isRequestSent = function () {
        if ($scope.user.requests.indexOf($scope.currentUser) == -1) {
            return false
        }
        return true
    }

    $scope.$watch('selectedUser', function (n, o) {
        $scope.getUserDetails()
    })



}
