'use strict';

/**
 * IndexController
 *
 * Description
 */

angular
  .module('chat')
  .controller('IndexController', IndexController);

IndexController.$inject = ['$http', '$rootScope', '$scope', '$state', 'AuthService'];


function IndexController($http, $rootScope, $scope, $state, AuthService) {
 
//  $rootScope.$on('$stateChangeSuccess', 
//  function(event, toState, toParams, fromState, fromParams){
//   if(localStorage.getItem("token")){
    
    
//     $http.defaults.headers.common.Authorization = localStorage.getItem("token");
//     $http.defaults.headers.common['if-none-match'] = '';
//     }

    
//     else delete $http.defaults.headers.common.Authorization
  
//     })

    // AuthService.checkAuth().then(function (res) {
    //   console.log(res)
    // }).catch(function (res) {
    //   console.log(res + 'sadasdasd')
    // })
 
}
