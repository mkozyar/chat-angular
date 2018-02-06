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
          .state('home.login', {
            url: 'login',
            views: {
              '@home': {
                templateUrl: 'app/pages/auth/login/login.html',
                controller: 'loginController'
              }
            }
          })
          .state('home.registration', {
            url: 'registration',
            views: {
              '@home': {
                templateUrl: 'app/pages/auth/registration/registration.html',
                controller: 'registrationController'
              }
            }
          })


        $urlRouterProvider.otherwise('/');
        //  $locationProvider.html5Mode(true);
      }
    
    })();