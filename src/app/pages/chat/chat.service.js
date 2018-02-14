'use strict';

/**
 * ChatService
 *
 * Description
 */

angular
  .module('chat')

  .factory('ChatService', ['$rootScope', '$http',  '$q', '$timeout',
    function ($rootScope, $http,  Q, $timeout) {

        var URL_MAP = {
            getMessages: 'messages',
            getChatRooms: 'chats'
        }

        function getMessages(chatRoom) {
            var url = app.CONFIG.HOST_API + URL_MAP.getMessages + '/' + chatRoom;
            return $timeout(function () {
              var d = Q.defer();
              $http.get(url)
                .success(function (data) {
                  d.resolve(data);
                }).error(function (e) {
                  d.reject(e);
                });
              return d.promise;
            }).catch(function (e) {
              //AlertMessageService.alertFail(e ? e.message || e : "getMessages ERROR!");
              throw e;
            });
          };

          function getChatRooms() {
            var url = app.CONFIG.HOST_API + URL_MAP.getChatRooms + '/mkozyar';
            return $timeout(function () {
              var d = Q.defer();
              $http.get(url)
                .success(function (data) {
                  d.resolve(data);
                }).error(function (e) {
                  d.reject(e);
                });
              return d.promise;
            }).catch(function (e) {
              //AlertMessageService.alertFail(e ? e.message || e : "getChatRooms ERROR!");
              throw e;
            });
          };



        return {
          
            URL_MAP: URL_MAP,
            getMessages: getMessages,
            getChatRooms: getChatRooms
        }

    }])