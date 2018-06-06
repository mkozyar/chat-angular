angular
    .module('chat')
    .factory('sessionInjector', ['$injector', function ($injector) {

        var sessionInjector = {
            request: function (config) {
                if (localStorage.getItem("token")) {
                    config.headers['Authorization'] = localStorage.getItem("token");

                }
                return config;
            },
            responseError: function (rejection) {
                if(rejection.status == 403){
                    $injector.get('$state').go('home.login')
                }
                return
            }
        };

        return sessionInjector;
    }])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('sessionInjector');

    }]);