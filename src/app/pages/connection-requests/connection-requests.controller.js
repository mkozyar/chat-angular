'use strict';

/**
 * connectionRequestsController
 *
 * Description
 */

angular
    .module('chat')
    .controller('connectionRequestsController', connectionRequestsController);

    connectionRequestsController.$inject = ['$rootScope', '$scope', 'ngDialog', '$state', '$window', '$timeout', 'ChatService'];


function connectionRequestsController($rootScope, $scope, ngDialog, $state, $window, $timeout, ChatService) {

    $scope.filters = {
        connectionsSearch: '',
        connectionRequests: JSON.parse(localStorage.getItem("connectionRequests")),
        currentUser: JSON.parse(localStorage.getItem("currentUser"))
    }

      

    $scope.getConnections = function () {
            ChatService.getConnections($scope.filters)
                .then(function (data) {
                    console.log(data)
                    $scope.users = data.data
                })
        
    }

    $scope.getActiveUser = function(name){
        return (name == $state.params.userName)
    }


    $scope.$watch('filters.connectionsSearch', function (n, o) {
    
        $scope.getConnections()
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
          controller: 'modalMenuController'
        })
      }


}
