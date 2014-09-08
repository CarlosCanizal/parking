'use strict';

angular.module('Parking.services')
.factory('Parse', ['$q', function($q){
  return{
    initialize : function(){
      Parse.initialize('OSp76NSTm4GS06HLer2NnaWK43EOytnPlD2WzMTU', '8haBHKSSW3cIb6W4IXsRa4EbEusqfOJvf9wH3TJO');
      return Parse;
    },
    currentUser : function(){
      return Parse.User.current();
    },
    fetchUser : function(){
      return Parse.User.current().fetch();
    },
    saveVehicle : function(vehicle_attr){
      var deferred = $q.defer();
      var Vehicle = Parse.Object.extend("Vehicle");
      var vehicle = new Vehicle();

      vehicle.save(vehicle_attr).then(function(vehicle){
        deferred.resolve(vehicle);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    deleteVehicle: function(vehicle){
      return vehicle.destroy();
    },
    getVehicle: function(vehicleId){
      var deferred = $q.defer();
      var Vehicle = Parse.Object.extend('Vehicle');
      var query = new Parse.Query(Vehicle);

      query.get(vehicleId).then(function(vehicle){
        deferred.resolve(vehicle);
      },function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    },
    getVehicles: function(){
      var deferred = $q.defer();
      var Vehicle = Parse.Object.extend('Vehicle');
      var query = new Parse.Query(Vehicle);

      query.find().then(function(vehicles){
        deferred.resolve(vehicles);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    saveCheckin: function(newCheckin){
      var deferred = $q.defer();
      var Checkin = Parse.Object.extend('Checkin');
      var checkin = new Checkin();

      checkin.save(newCheckin).then(function(checkin){
        deferred.resolve(checkin);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    getCheckins : function(){
      var deferred = $q.defer();
      var Checkin = Parse.Object.extend('Checkin');
      var query = new Parse.Query(Checkin);

      query.find().then(function(checkins){
        deferred.resolve(checkins);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    deleteCheckin: function(checkin){
      return checkin.destroy();
    },
    getCheckin: function(checkinId){
      var deferred = $q.defer();
      var Checkin = Parse.Object.extend('Checkin');
      var query = new Parse.Query(Checkin);

      query.get(checkinId).then(function(checkin){
        deferred.resolve(checkin);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    },
    getGeopoint: function(latitude, longitude){
      return new Parse.GeoPoint([latitude, longitude]);
    }

  };
  
}]);