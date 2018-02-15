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
 

   $scope.scrollTop = $('div.scroll').offset().top + 10000

   $(document).ready(function () {
     $('.messages-list').animate({ "scrollTop": $scope.scrollTop }, 1);
   });

  $scope.$watch('leftBarVisible', function (n, o) {


  })

 $scope.chatRoom = $state.params.chatRoom

  $scope.getMessages = function (chatRoom) {
    ChatService.getMessages(chatRoom)
      .then(function (data) {
        $scope.messages = data
      })
  }

  if($scope.chatRoom ){
    $scope.getMessages($scope.chatRoom)
  }

}
