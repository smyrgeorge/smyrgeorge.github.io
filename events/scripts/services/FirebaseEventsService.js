'use strict';

angular.module('toDoListApp')
    .factory('FirebaseEventsService', function(FURL, $firebaseArray) {

      var ref = new Firebase(FURL);
      var eventsRef = ref.child('events');

      var frevents = {

        today: null,

        getYesterday: function(){
          var today = new Date();
          var yesterday = new Date(today);
          yesterday.setDate(today.getDate() - 1);
          return frevents.dateToObj(yesterday);
        },

        getNextDay: function(date){
          var nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);
          return frevents.dateToObj(nextDate);
        },

        dateToObj: function(date){
          var dd = date.getDate();
          var mm = date.getMonth()+1;
          var yyyy = date.getFullYear();

          if(dd < 10) {
              dd = '0'+dd;
          }

          if(mm < 10) {
              mm = '0'+mm;
          }

          date = {
            day: dd,
            month: mm,
            year: yyyy,
            full: dd + '-' + mm + '-' + yyyy
          };

          return date;
        },

        getCurrentDate: function(){
          var today = new Date();
          frevents.today = frevents.dateToObj(today);
        },

        getTodayEvents: function(){
          frevents.getCurrentDate();

          var ref = eventsRef
            .orderByChild("start_time/date/full")
            .startAt(frevents.today.full)
            .endAt(frevents.today.full);

          return $firebaseArray(ref);
        },

        getByDateEvents: function(date){ //date should be string with the following format 'dd-mm-yyyy'
          frevents.getCurrentDate();

          var ref = eventsRef
            .orderByChild("start_time/date/full")
            .startAt(date)
            .endAt(date);

          return $firebaseArray(ref);
        },

      };

      return frevents;

    });
