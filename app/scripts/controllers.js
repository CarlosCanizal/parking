'use strict';
angular.module('Parking.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Parse) {

  //Initialize Parse
  Parse.initialize();

  //jccz revisar si es un bung loginDati
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $ionicModal.fromTemplateUrl('templates/addVehicle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVehicle = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.openLogin = function() {
    $scope.modal.show();
  };

  $scope.openVehicle = function() {
    $scope.modalVehicle.show();
  };

  $scope.closeVehicle = function() {
    $scope.modalVehicle.hide();
  };

  

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('VehiclesCtrl', function($scope,$ionicModal, Parse, VehicleParser) {

  $scope.vehicle = {};
  $scope.vehicles = [];
  

  $scope.deleteVehicle = function(vehicle){
    
    Parse.deleteVehicle(vehicle).then(function(){
      var index = $scope.vehicles.indexOf(vehicle);
      console.log(index);
      $scope.vehicles.splice(index,1);
      $scope.$apply();
    },function(error){
      console.log(error.message);
    });
  };

  Parse.getVehicles().then(function(vehicles){
    $scope.vehicles = vehicles;
  },function(error){
    console.log(error.message);
  });
})
.controller('VehicleCtrl', function($scope, $stateParams, Parse, VehicleParser) {

  var id = $stateParams.vehicleId;
  Parse.getVehicle(id).then(function(vehicle){
    $scope.vehicle = vehicle;
  },function(error){
    console.log(error.message);
  });

})
.controller('ParkingCtrl', function($scope, $stateParams, Parse, VehicleParser,$ionicScrollDelegate) {

  $scope.time = 60;

  $scope.plus = function(){
    $scope.time += 15;
  };

  $scope.minus = function(){
    var time = $scope.time - 15;
    $scope.time = time > 0 ? time : $scope.time;
  };



  Parse.getVehicles().then(function(vehicles){
    $scope.vehicles = vehicles;
  },function(error){
    console.log(error.message);
  });

});
