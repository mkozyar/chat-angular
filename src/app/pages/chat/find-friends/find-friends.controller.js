'use strict';

/**
 * findFriendsController
 *
 * Description
 */

angular
    .module('chat')
    .controller('findFriendsController', findFriendsController);

findFriendsController.$inject = ['$rootScope', '$scope', 'ngDialog', '$state', '$window', '$timeout', 'ChatService'];


function findFriendsController($rootScope, $scope, ngDialog, $state, $window, $timeout, ChatService) {

    $scope.filters = {
        friendsSearch: ''
    }
    $scope.getUsers = function () {
        if ($scope.filters.friendsSearch) {
            ChatService.getUsers($scope.filters)
                .then(function (data) {
                    $scope.users = data.data
                })
        }
    }

    $scope.getActiveUser = function(name){
        return (name == $state.params.userName)
    }


    $scope.$watch('filters.friendsSearch', function (n, o) {
        if(!$scope.filters.friendsSearch){
            $scope.users = []
        }
        $scope.getUsers()
    })



    $scope.screenWidth = window.innerWidth;

    window.addEventListener("resize", windowResize);

    $scope.leftBarVisible = true
    $scope.screenWidth = window.innerWidth;

    function windowResize() {
        setTimeout(function () {

            $scope.screenWidth = window.innerWidth;
            $state.reload()
        })

    }




    $scope.fullLeftSideWidth = function () {
        if ($scope.leftBarVisible && $scope.screenWidth < 700) {
            return 'display-none'
        }
        if ($scope.leftBarVisible && $scope.screenWidth > 700) {
            return 'messages-area'
        }
        else
            return 'messages-area full-width'
    }

    $scope.leftSideClass = function () {
        if ($scope.leftBarVisible && $scope.screenWidth > 700) {
            return 'left-side'

        }
        if ($scope.leftBarVisible && $scope.screenWidth < 700) {
            return 'left-side-full-width'

        }
        else {
            return 'small'

        }
    }

    $scope.toggleLeftBar = function () {
        $scope.leftBarVisible = !$scope.leftBarVisible
    }

    $scope.$watch('screenWidth', function (n, o) {
        if ($scope.screenWidth < 700) {
            $scope.leftBarVisible = false
        }
        else {
            $scope.leftBarVisible = true
        }
    })


    $scope.showMenuModal = function () {
        ngDialog.open({
          template: 'app/pages/chat/modal-menu/modal-menu.html',
          className: 'ngdialog-theme-plain modal-menu',
          scope: $scope
        })
      }


}
