'use strict';

angular.module('toDoListApp')
    .factory('FacebookUserEventsService', function(Facebook, FirebaseUserEventsService, toaster) {

      var frevents = FirebaseUserEventsService;
      var events = {

        attending: null,
        notReplied: null,
        declined: null,
        maybeAttending: null,

        parseStringTimeToJSON: function(start_time){
          var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];

          var obj = {};
          var date = {};
          var time = {};

          var temp_start_time = start_time.split('T')
          var tempdate = temp_start_time[0].split('-');
          var temptime = temp_start_time[1].split('+');

          var gmt = '+' + temptime[1];
          temptime = temptime[0].split(':');

          date['year'] = tempdate[0];
          date['month'] = tempdate[1];
          date['month_name'] = monthNames[parseInt(tempdate[1], 10) - 1];
          date['day'] = tempdate[2];
          obj['date'] = date;

          time['hour'] = temptime[0];
          time['minute'] = temptime[1];
          time['second'] = temptime[2];
          time['gmt'] = gmt;
          obj['time'] = time;

          obj['start_time'] = start_time;
          return obj;
        },

        getAttending: function() {
          Facebook.api('me/events?since=today&type=attending&limit=25&fields=description,end_time,name,place,start_time,attending_count,maybe_count,declined_count,picture',
            function(response) {
              if (response && !response.error) {

                events.attending = {};

                for(var i=0; i<response.data.length; i++){
                  response.data[i].start_time = events.parseStringTimeToJSON(response.data[i].start_time);
                  events.attending[response.data[i].id] = response.data[i];
                  frevents.updateGlobalEvents(events.attending[response.data[i].id]);
                  // frevents.updateUserEventsSingle(response.data[i].id, {rvsp_status: "attending", id: response.data[i].id});
                }
                frevents.updateUserEvents('attending', events.attending);
              }
              else{
                toaster.pop('error', response);
              }
            });
        },

        getMaybeAttending: function() {
          Facebook.api('me/events?since=today&type=maybe&limit=25&fields=description,end_time,name,place,start_time,attending_count,maybe_count,declined_count,picture',
            function(response) {
              if (response && !response.error) {

                events.maybeAttending = {};

                for(var i=0; i<response.data.length; i++){
                  response.data[i].start_time = events.parseStringTimeToJSON(response.data[i].start_time);
                  events.maybeAttending[response.data[i].id] = response.data[i];
                  frevents.updateGlobalEvents(events.maybeAttending[response.data[i].id]);
                  // frevents.updateUserEventsSingle(response.data[i].id, {rvsp_status: "maybe", id: response.data[i].id});
                }
                frevents.updateUserEvents('maybe', events.maybeAttending);
              }
              else{
                toaster.pop('error', response);
              }
            });
        },

        getNotReplied: function() {
          Facebook.api('me/events?since=today&type=not_replied&limit=25&fields=description,end_time,name,place,start_time,attending_count,maybe_count,declined_count,picture',
            function(response) {
              if (response && !response.error) {

                events.notReplied = {};

                for(var i =0; i<response.data.length; i++){
                  response.data[i].start_time = events.parseStringTimeToJSON(response.data[i].start_time);
                  events.notReplied[response.data[i].id] = response.data[i];
                  frevents.updateGlobalEvents(events.notReplied[response.data[i].id]);
                  // frevents.updateUserEventsSingle(response.data[i].id, {rvsp_status: "not_replied", id: response.data[i].id});
                }
                frevents.updateUserEvents('not_replied', events.notReplied);
              }
              else{
                toaster.pop('error', response);
              }
            });
        },

        getDeclined: function() {
          Facebook.api('me/events?since=today&type=declined&limit=25&fields=description,end_time,name,place,start_time,attending_count,maybe_count,declined_count,picture',
            function(response) {
              if (response && !response.error) {

                events.declined = {};

                for(var i=0; i<response.data.length; i++){
                  response.data[i].start_time = events.parseStringTimeToJSON(response.data[i].start_time);
                  events.declined[response.data[i].id] = response.data[i];
                  frevents.updateGlobalEvents(events.declined[response.data[i].id]);
                  // frevents.updateUserEventsSingle(response.data[i].id, {rvsp_status: "declined", id: response.data[i].id});
                }
                frevents.updateUserEvents('declined', events.declined);
              }
              else{
                toaster.pop('error', response);
              }
            });
        },

      };

      return events;

    });
