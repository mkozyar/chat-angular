'use strict';

/**
 * messagesController
 *
 * Description
 */

angular
  .module('chat')
  .controller('messagesController', messagesController);

messagesController.$inject = ['$rootScope', '$scope', '$state', '$window', '$timeout', 'ChatService'];


function messagesController($rootScope, $scope, $state, $window, $timeout, ChatService) {

  $scope.ws = new WebSocket('ws://localhost:3112/')

  $scope.ws.onmessage =  function(data){
    $state.reload()
  }
 

  $scope.scrollTop = $('div.scroll').offset().top + 10000

  $(document).ready(function () {
    $('.messages-list').animate({ "scrollTop": $scope.scrollTop }, 1);
  });

  $scope.$watch('leftBarVisible', function (n, o) {


  })

  $scope.myAvatar = localStorage.getItem("currentUserAvatar").slice(1, -1)
  $scope.currentUser = localStorage.getItem("currentUser")
  $scope.newMsg = ''
  $scope.chatRoom = $state.params.chatRoom

  $scope.getMessages = function (chatRoom) {
    ChatService.getMessages(chatRoom)
      .then(function (data) {
        $scope.messages = data
      })
  }

  if ($scope.chatRoom) {
    $scope.getMessages($scope.chatRoom)
  }

  $scope.sendMsg = function () {
    if ($scope.newMsg) {
      ChatService.sendMsg($scope.chatRoom, localStorage.getItem("currentUser"), $scope.newMsg, localStorage.getItem("currentUserAvatar"), new Date()).then(function (res) {
        //$state.reload()

      })
      $scope.ws.send('message-text')
      
    }
  }

}
