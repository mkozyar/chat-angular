'use strict';

/**
 * chatController
 *
 * Description
 */

angular
  .module('chat')
  .controller('chatController', chatController);

chatController.$inject = ['$rootScope', '$scope', '$state', '$window', '$timeout', 'ChatService'];


function chatController($rootScope, $scope, $state, $window, $timeout, ChatService) {

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

  $scope.$watch('leftBarVisible', function (n, o) {


  })


  $scope.activeRoom = $state.params.chatRoom
  console.log($scope.activeRoom)

  function getChatRooms() {
    ChatService.getChatRooms()
      .then(function (data) {
        $scope.rooms = data
      })
  }

  getChatRooms()

  $scope.getActiveRoom = function (room) {
    if (room === $state.params.chatRoom) {
      return true
    }
    return false
  }

}
