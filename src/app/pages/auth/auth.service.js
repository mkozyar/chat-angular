'use strict';

/**
 * AuthService
 *
 * Description
 */

angular
  .module('chat')

  .factory('AuthService', ['$rootScope', '$http',  '$q', '$timeout',
    function ($rootScope, $http,  Q, $timeout) {

        var URL_MAP = {
          register: 'registration',
          signIn: 'login',
          checkAuth: ''
        }

        function register(form) {
            var url = app.CONFIG.HOST_API + URL_MAP.register;
            return $timeout(function () {
              var d = Q.defer();
              $http.post(url, form)
                .success(function (data) {
                  d.resolve();
                }).error(function (e) {
                  d.reject(e);
                });
              return d.promise;
            }).catch(function (e) {
              console.log("duplicate")
              //AlertMessageService.alertFail(e ? e.message || e : "buildGdprDetails ERROR!");
              throw e;
            });
          };

          function checkAuth() {
            var url = app.CONFIG.HOST_API + URL_MAP.checkAuth;
            return $timeout(function () {
              var d = Q.defer();
              $http.get(url)
                .success(function (data) {
                  console.log('asdasda111')
                  d.resolve();
                }).error(function (e) {
                  d.reject(e);
                });
              return d.promise;
            }).catch(function (e) {
              console.log("checkAuth")
              //AlertMessageService.alertFail(e ? e.message || e : "buildGdprDetails ERROR!");
              throw e;
            });
          };

        function signIn(form) {
            var url = app.CONFIG.HOST_API + URL_MAP.signIn;
            return $timeout(function () {
              var d = Q.defer();
              $http.post(url, form)
                .then(function (data) {
                  d.resolve(data);
                }, function(){
                  d.reject()
                })
              return d.promise;
            }).catch(function (e) {
              console.log("asd err")
              //AlertMessageService.alertFail(e ? e.message || e : "buildGdprDetails ERROR!");
              throw e;
            });
          };



        return {
          
            URL_MAP: URL_MAP,
            register: register,
            signIn: signIn,
            checkAuth: checkAuth
        }

    }])