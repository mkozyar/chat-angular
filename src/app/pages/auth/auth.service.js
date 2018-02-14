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
            asd: 'chat'
        }

        function asd() {
            var url = app.CONFIG.HOST_API + URL_MAP.asd;
            return $timeout(function () {
              var d = Q.defer();
              $http.get(url)
                .success(function (data) {
                    console.log(data)
                  d.resolve(data);
                }).error(function (e) {
                  d.reject(e);
                });
              return d.promise;
            }).catch(function (e) {
              //AlertMessageService.alertFail(e ? e.message || e : "buildGdprDetails ERROR!");
              throw e;
            });
          };



        return {
          
            URL_MAP: URL_MAP,
            asd: asd
        }

    }])