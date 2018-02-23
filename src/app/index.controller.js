'use strict';

/**
 * IndexController
 *
 * Description
 */

angular
  .module('chat')
  .controller('IndexController', IndexController);

IndexController.$inject = ['$rootScope', '$scope', '$state'];


function IndexController($rootScope, $scope, $state) {
 
 $rootScope.$on('$stateChangeSuccess', 
 function(event, toState, toParams, fromState, fromParams){
 
  })
 
}
