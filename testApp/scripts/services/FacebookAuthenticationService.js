'use strict';

angular.module('toDoListApp')
    .factory('FacebookAuthenticationService', function(Facebook, toaster, $location, geolocation, FirebaseUserService) {

      var fireuser = FirebaseUserService;

      var auth = {

        accessToken: null,
        signedRequest: null,

        loggedIn: false,
        location: null,
        friends: null,
        user: null,

        facebookLogin: function() {
          Facebook.login(function(response) {
            if (response && !response.error) {
              auth.accessToken = response.authResponse.accessToken;
              auth.signedRequest = response.authResponse.signedRequest;
              auth.getLoginStatus();
            }
          }, {scope: 'email,user_events,public_profile,user_location,user_birthday,user_friends'});
        },

        getLoginStatus: function() {
          Facebook.getLoginStatus(function(response) {
            if (response && !response.error) {
              if(response.status === 'connected') {
                auth.getUserFriends();
                auth.getUserLocation();
                auth.getUser();
              } else {
                auth.loggedIn = false;
                toaster.pop('error', "An error occured");
              }
            }
            else{
              auth.loggedIn = false;
              toaster.pop('error', "An error occured");
            }
          });
        },

        getUser: function() {
          Facebook.api('/me?fields=id,name,picture,cover,gender,permissions,email,birthday', function(response) {
            if (response && !response.error) {
              auth.user = response;
              auth.redirectIfLoggedIn();
            }
            else{
              auth.loggedIn = false;
              toaster.pop('error', "An error occured");
            }

          });
        },

        getUserLocation: function() {
          geolocation.getLocation().then(function(data){
            auth.location = {lat:data.coords.latitude, lon:data.coords.longitude};
            auth.redirectIfLoggedIn();
          });
        },

        getUserFriends: function() {
          Facebook.api('/me/friends', function(response) {
            if (response && !response.error) {
              auth.friends = response;
              auth.redirectIfLoggedIn();
            }
            else{
              auth.loggedIn = false;
              toaster.pop('error', "An error occured");
            }
          });
        },

        redirectIfLoggedIn: function(){
          if(auth.user !== null && auth.location !== null && auth.friends !== null){
            auth.loggedIn = true;
            toaster.pop('success', "Logged in successfully");
            // $location.path('/list');

            fireuser.addUserIfNotExists(auth.user.id, auth.user);
          }
        },
      };



      return auth;

    });
