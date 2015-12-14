'use strict';

angular.module('toDoListApp')
    .factory('FirebaseUserService', function(FURL, $firebaseObject, $firebaseArray) {

      var ref = new Firebase(FURL);
      var profileRef = ref.child('profile');

      var fruser = {

        profile: null,

        addUserIfNotExists: function(uid, user){
          profileRef.child(uid).child('info').once('value', function(snap) {
            if( snap.val() === null ) {
              profileRef.child(uid).child('info').set(user);
            }
          });
        },
      };

      return fruser;

    });
