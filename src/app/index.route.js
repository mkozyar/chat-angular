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
          .state('home.chat.messages', {
            url: '/:chatRoom',
            views: {
              '@home.chat': {
                templateUrl: 'app/pages/chat/messages/messages.html',
                controller: 'messagesController'
              }
            }
          })
          .state('home.find-friends', {
            url: 'find-friends',
            views: {
              '@home': {
                templateUrl: 'app/pages/find-friends/find-friends.html',
                controller: 'findFriendsController'
              }
            }
          })
          .state('home.find-friends.user', {
            url: '/:userName',
            views: {
              '@home.find-friends': {
                templateUrl: 'app/pages/find-friends/users/user.html',
                controller: 'userController'
              }
            }
          })
          .state('home.connection-requests', {
            url: 'connection-requests',
            views: {
              '@home': {
                templateUrl: 'app/pages/connection-requests/connection-requests.html',
                controller: 'connectionRequestsController'
              }
            }
          })
          .state('home.connection-requests.user', {
            url: '/:userName',
            views: {
              '@home.connection-requests': {
                templateUrl: 'app/pages/connection-requests/users/user.html',
                controller: 'connectionUserController'
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


        $urlRouterProvider.otherwise('/chat');
        //  $locationProvider.html5Mode(true);
      }
    
    })();