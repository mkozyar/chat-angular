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

  $scope.scrollTop = $('div.scroll').offset().top + 10000

  $(document).ready(function () {
    $('.messages-list').animate({ "scrollTop": $scope.scrollTop }, 1);
  });

  $scope.$watch('leftBarVisible', function (n, o) {


  })

  function getChatRooms() {
    ChatService.getChatRooms()
      .then(function (data) {
        $scope.rooms = data
        console.log($scope.rooms)
      })
  }
  
  getChatRooms() 

  $scope.getMessages = function (chatRoom) {
    ChatService.getMessages(chatRoom)
      .then(function (data) {
        $scope.messages = data
        console.log($scope.messages)
      })
  }

}
