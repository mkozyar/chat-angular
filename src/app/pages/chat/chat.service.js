'use strict';

/**
 * ChatService
 *
 * Description
 */

angular
  .module('chat')

  .factory('ChatService', ['$rootScope', '$http', '$q', '$timeout',
    function ($rootScope, $http, Q, $timeout) {

      var URL_MAP = {
        getMessages: 'messages',
        getChatRooms: 'chats/',
        sendMsg: 'messages/',
        createChat: 'create-chat/',
        getUsers: 'users',
        getUserDetails: 'users/'
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

      function createChat(form) {
        var url = app.CONFIG.HOST_API + URL_MAP.createChat;
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

      function sendMsg(chatName, sender, text, avatar, date) {
        var body = {
          chatId: chatName,
          sender: sender,
          text: text,
          sentAt: date,
          avatar: avatar

        }
        var url = app.CONFIG.HOST_API + URL_MAP.sendMsg + chatName;
        return $timeout(function () {
          var d = Q.defer();
          $http.post(url, body)
            .success(function (data) {
              d.resolve(data);
            }).error(function (e) {
              d.reject(e);
            });
          return d.promise;
        }).catch(function (e) {
          //AlertMessageService.alertFail(e ? e.message || e : "sendMsg ERROR!");
          throw e;
        });
      };

      function getChatRooms(user, filters) {
        filters = clearEmptyFilters(filters)
        var url = app.CONFIG.HOST_API + URL_MAP.getChatRooms + user + '?' + objToParams(filters);
        return $timeout(function () {
          var d = Q.defer();
          $http.get(url)
            .then(function (data) {
              d.resolve(data);
            })
          // .error(function (e) {
          //   d.reject(e);
          // });
          return d.promise;
        }).catch(function (e) {
          //AlertMessageService.alertFail(e ? e.message || e : "getChatRooms ERROR!");
          throw e;
        });
      };

      function getUsers(filters){
        var url = app.CONFIG.HOST_API + URL_MAP.getUsers + '?' + objToParams(filters);
        return $timeout(function () {
          var d = Q.defer();
          $http.get(url)
            .then(function (data) {
              d.resolve(data);
            })
          // .error(function (e) {
          //   d.reject(e);
          // });
          return d.promise;
        }).catch(function (e) {
          //AlertMessageService.alertFail(e ? e.message || e : "getChatRooms ERROR!");
          throw e;
        });
      }

      function getUserDetails(userName){
        var url = app.CONFIG.HOST_API + URL_MAP.getUserDetails + userName;
        return $timeout(function () {
          var d = Q.defer();
          $http.get(url)
            .then(function (data) {
              d.resolve(data);
            })
          // .error(function (e) {
          //   d.reject(e);
          // });
          return d.promise;
        }).catch(function (e) {
          //AlertMessageService.alertFail(e ? e.message || e : "getChatRooms ERROR!");
          throw e;
        });
      }

      return {

        URL_MAP: URL_MAP,
        getMessages: getMessages,
        getChatRooms: getChatRooms,
        sendMsg: sendMsg,
        createChat: createChat,
        getUsers: getUsers,
        getUserDetails: getUserDetails
      }

    }])