'use strict';

angular.module('toDoListApp')
    .factory('FirebaseUserService', function(FURL) {

      var ref = new Firebase(FURL);
      var profileRef = ref.child('profile');

      var fruser = {

        addUserIfNotExists: function(uid, user){
          profileRef.child(uid).child('info').once('value', function(snap) {
            if( snap.val() === null ) {
              profileRef.child(uid).child('info').set(user);
            }
          });
        },

        addUser: function(uid, user){
          profileRef.child(uid).child('info').set(user);
        },
      };

      return fruser;

    });
