'use strict';

angular.module('toDoListApp')
    .factory('FirebaseUserEventsService', function(FURL, $firebaseObject, $firebaseArray) {

      // var fbauth = FacebookAuthenticationService;
      var ref = new Firebase(FURL);
      var profileRef = ref.child('profile');
      var globalEvents = ref.child('events');

      var frevents = {

        eventsRef: null,

        attending: null,
        maybeAttending: null,
        notReplied: null,
        declined: null,


        createEventsChildRef: function(uid){
          frevents.eventsRef = profileRef.child(uid).child('events');
        },

        updateUserEvents: function(type, events){
          frevents.eventsRef.child(type).set(events);
        },

        updateGlobalEvents: function(event){
          globalEvents.child(event.id).set(event);
        },

        updateUserEventsSingle: function(eventID, status){
          frevents.eventsRef.child(eventID).set(status);
        },

        extend: function(base) {
                  var parts = Array.prototype.slice.call(arguments, 1);
                  parts.forEach(function (p) {
                      if (p && typeof (p) === 'object') {
                          for (var k in p) {
                              if (p.hasOwnProperty(k)) {
                                  base[k] = p[k];
                              }
                          }
                      }
                  });
                  return base;
        },

        getAttending: function(){
          var ref = frevents.eventsRef.child('attending');
          return $firebaseArray(ref);
        },

        getMaybeAttending: function(){
          var ref = frevents.eventsRef.child('maybe');
          return $firebaseArray(ref);
        },

        getNotReplied: function(){
          var ref = frevents.eventsRef.child('not_replied');
          return $firebaseArray(ref);
        },

        getDeclined: function(){
          var ref = frevents.eventsRef.child('declined');
          return $firebaseArray(ref);
        },

      };

      return frevents;

    });
