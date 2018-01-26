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



        $urlRouterProvider.otherwise('/');
        //  $locationProvider.html5Mode(true);
      }
    
    })();