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
    }
  };
  
}]);