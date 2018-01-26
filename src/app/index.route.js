(function () {
    'use strict';
  
    angular
      .module('chat')
      .config(routeConfig);
  
    /*@ngInject*/
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider

        .state('home', {
            url: '/home',
           
                templateUrl: 'app/pages/home/asd.html',
                controller: 'asdController'
              
            
            
          })



        $urlRouterProvider.otherwise('/');
        //  $locationProvider.html5Mode(true);
      }
    
    })();