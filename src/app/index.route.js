(function () {
    'use strict';
  
    angular
      .module('chat')
      .config(routeConfig);
  
    /*@ngInject*/
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
        .state('home', {
            url: '/',
                templateUrl: 'app/pages/main/main.html',
                controller: 'mainController'
              
          })
          .state('home.chat', {
            url: 'chat',
            views: {
              '@home': {
                templateUrl: 'app/pages/chat/chat.html',
                controller: 'chatController'
              }
            }
          })


        $urlRouterProvider.otherwise('/');
        //  $locationProvider.html5Mode(true);
      }
    
    })();