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

        function objToParams(obj) {
          var str = '';
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (str != "") {
                str += "&";
              }
              str += key + "=" + encodeURIComponent(obj[key]);
            }
          }
          return str;
        }
  
        function clearEmptyFilters(obj) {
          if (!obj) {
            return false;
          }
          var o = _.clone(obj);
          _.each(obj, function (e, k) {
            if (e === '') {
              delete o[k];
            }
          });
          return o;
        }



        function getMessages(chatRoom, token) {
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

          function getChatRooms(filters) {
           
            filters = clearEmptyFilters(filters)
            var url = app.CONFIG.HOST_API + URL_MAP.getChatRooms + '/mkozyar' + '?' + objToParams(filters);
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