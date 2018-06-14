'use strict';

/**
 * modalMenuController
 *
 * Description
 */

angular
    .module('chat')
    .controller('modalMenuController', modalMenuController);

    modalMenuController.$inject = ['$rootScope', 'ngDialog', '$scope', '$state', '$window', '$timeout', 'ChatService'];


function modalMenuController($rootScope, ngDialog, $scope, $state, $window, $timeout, ChatService) {

   
        $scope.connectionRequests = JSON.parse(localStorage.getItem("connectionRequests"))
    

}
