'use strict';

angular.module('toDoListApp')
    .factory('FacebookAuthenticationService', function(Facebook, toaster, $location, geolocation, FirebaseUserService) {

      var fireuser = FirebaseUserService;

      var auth = {

        // profileImage: 'http://ssl.gstatic.com/accounts/ui/avatar_2x.png',
        profileImage: 'images/avatar.png',

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
            else{
              auth.loggedIn = false;
              toaster.pop('error', "An error occured");
            }
          }, {scope: 'email,user_events,public_profile,user_location,user_birthday,user_friends'});
        },

        getLoginStatus: function() {
          Facebook.getLoginStatus(function(response) {
            if (response && !response.error) {
              if(response.status === 'connected') {
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
          Facebook.api('/me?fields=id,name,picture.width(1024).height(1024),cover,gender,permissions,email,birthday', function(response) {
            if (response && !response.error) {
              auth.user = response;
              auth.profileImage = response.picture.data.url;
              auth.getUserFriends();
              auth.getUserLocation();
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
            auth.user.location = auth.location;
            auth.redirectIfLoggedIn();
          });
        },

        getUserFriends: function() {
          Facebook.api('/me/friends', function(response) {
            if (response && !response.error) {
              auth.friends = response;
              auth.user.friends = {'list': auth.friends.data, 'total_count': auth.friends.data.length};
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
            fireuser.addUser(auth.user.id, auth.user);
            toaster.pop('success', "Logged in successfully");
            $location.path('/sync');
          }
        },
      };



      return auth;

    });
