'use strict';

/**
 * chatController
 *
 * Description
 */

angular
  .module('chat')
  .controller('chatController', chatController);

chatController.$inject = ['$rootScope', 'ngDialog', '$scope', '$state', '$window', '$timeout', 'ChatService'];


function chatController($rootScope, ngDialog, $scope, $state, $window, $timeout, ChatService) {

  $scope.filters = {
    roomSearch: ''
  }
  if (localStorage.getItem("currentUser")) {
    $scope.currentUser = localStorage.getItem("currentUser").replace(/[""]/g, '')
  }
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



  function getChatRooms() {
    ChatService.getChatRooms($scope.currentUser, $scope.filters)
      .then(function (data) {
        $scope.rooms = data.data
      })
  }



  $scope.getActiveRoom = function (room) {
    if (room === $state.params.chatRoom) {
      return true
    }
    return false
  }

  $scope.showMenuModal = function () {
    ngDialog.open({
      template: 'app/pages/chat/modal-menu/modal-menu.html',
      className: 'ngdialog-theme-plain modal-menu',
      scope: $scope
    })
  }


  $scope.$watchCollection('filters', function (n, o) {
    getChatRooms($scope.filters);

  })

}
