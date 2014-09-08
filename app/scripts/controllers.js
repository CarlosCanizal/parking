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

  $ionicModal.fromTemplateUrl('templates/addVehicle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVehicle = modal;
  });

  $scope.addVehicle = function(){
    Parse.saveVehicle($scope.vehicle).then(function(vehicle){
      $scope.vehicles.push(vehicle);
      $scope.closeVehicle();
    },function(error){
      console.log(error);
    });
  };

  $scope.openVehicle = function() {
    $scope.modalVehicle.show();
  };

  $scope.closeVehicle = function() {
    $scope.modalVehicle.hide();
  };
  

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
.controller('CheckinCtrl', function($scope, Parse) {
  

})
.controller('ParkingCtrl', function($scope, $ionicModal, Parse, VehicleParser) {

  $scope.checkin = {};
  $scope.checkin.time = 60;
  $scope.rate = 3.00;
  $scope.payment = (($scope.checkin.time/60)*$scope.rate).toFixed(2);
  $scope.vehicle = {};
  $scope.vehicles = [];


  $scope.plus = function(){
    $scope.checkin.time += 15;
    $scope.payment = (($scope.checkin.time/60)*$scope.rate).toFixed(2);
  };

  $scope.minus = function(){
    var time = $scope.checkin.time - 15;
    $scope.checkin.time = time > 0 ? time : $scope.checkin.time;
    $scope.payment = (($scope.checkin.time/60)*$scope.rate).toFixed(2);
  };

  $scope.selectVehicle = function(vehicle,$event){
    $scope.checkin.plate = vehicle.plate;
    angular.element(document.querySelectorAll('.selected')).removeClass('selected');
    angular.element($event.currentTarget).addClass('selected');
  };

  Parse.getVehicles().then(function(vehicles){
    $scope.vehicles = vehicles;
    $scope.checkin.plate = vehicles[0].plate;
  },function(error){
    console.log(error.message);
  });


  $ionicModal.fromTemplateUrl('templates/addVehicle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVehicle = modal;
  });

  $scope.newCheckin = function(){
    console.log($scope.checkin);
  };

  $scope.addVehicle = function(){
    Parse.saveVehicle($scope.vehicle).then(function(vehicle){
      $scope.vehicles.push(vehicle);
      $scope.closeVehicle();
    },function(error){
      console.log(error);
    });
  };

  $scope.openVehicle = function() {
    $scope.modalVehicle.show();
  };

  $scope.closeVehicle = function() {
    $scope.modalVehicle.hide();
  };

});
