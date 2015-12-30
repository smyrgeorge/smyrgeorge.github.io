'use strict';

angular.module('toDoListApp')
    .factory('FirebaseUserEventsService', function(FURL, $firebaseObject, $firebaseArray) {

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

        getEvent: function(eventID){
          var ref = globalEvents.child(eventID);
          return $firebaseObject(ref);
        },

        getAttending: function(){
          var ref = frevents.eventsRef.child('attending');
          ref = ref.orderByChild("sortValue");
          return $firebaseArray(ref);
        },

        getMaybeAttending: function(){
          var ref = frevents.eventsRef.child('maybe');
          ref = ref.orderByChild("sortValue");
          return $firebaseArray(ref);
        },

        getNotReplied: function(){
          var ref = frevents.eventsRef.child('not_replied');
          ref = ref.orderByChild("sortValue");
          return $firebaseArray(ref);
        },

        getDeclined: function(){
          var ref = frevents.eventsRef.child('declined');
          ref = ref.orderByChild("sortValue");
          return $firebaseArray(ref);
        },

      };

      return frevents;

    });
