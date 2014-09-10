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

  $scope.addImage = function(){
    navigator.camera.getPicture(function(imageURI){
      $scope.vehicle.image = imageURI;
      $scope.$apply();
    }, function(message){
      console.log('Failed because: ' + message);
    },  { quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          allowEdit: true
        });
  };

  $scope.addVehicle = function(){

  Parse.saveVehicle($scope.vehicle).then(function(vehicle){
      $scope.vehicles.push(vehicle);
      $scope.closeVehicle();
    },function(error){
      alert(error.message);
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
.controller('CheckinCtrl', function($scope, $interval, Parse, CheckinParser) {
  
  Parse.getCheckins().then(function(checkins){
    $scope.checkins = checkins;
  },function(error){
    console.log(error);
  });

  $scope.deleteCheckin = function(checkin){

    Parse.deleteCheckin(checkin).then(function(){
      var index = $scope.checkins.indexOf(checkin);
      $scope.checkins.splice(index,1);
      $scope.$apply();
    },function(error){
      console.log(error.message);
    });
  };

})
.controller('ParkingCtrl', function($scope, $state, $stateParams, $ionicModal, Parse, VehicleParser,CheckinParser) {

  var checkinId = $stateParams.checkinId;

  $scope.checkin = {};
  $scope.checkin.time = 60;
  $scope.rate = 3.00;
  $scope.payment = (($scope.checkin.time/60)*$scope.rate).toFixed(2);
  $scope.vehicle = {};
  $scope.vehicles = [];
  $scope.isNew = true;

  if(checkinId !== 'new'){
    $scope.isNew = false;
    Parse.getCheckin(checkinId).then(function(checkin){
        $scope.vehicle = checkin.vehicle;
        $scope.vehicles.push(checkin.vehicle);
      },function(error){
        console.log(error);
    });

  }else{

    navigator.geolocation.getCurrentPosition(function(position){
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      $scope.checkin.geopoint = Parse.getGeopoint(latitude, longitude);
     }, function(error){
      console.log(error.message);
     });

    Parse.getVehicles().then(function(vehicles){
      $scope.vehicles = vehicles;
      $scope.checkin.vehicle= vehicles[0];
    },function(error){
      console.log(error.message);
    });

  }

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
    $scope.checkin.vehicle = vehicle;
    angular.element(document.querySelectorAll('.selected')).removeClass('selected');
    angular.element($event.currentTarget).addClass('selected');
  };

  $ionicModal.fromTemplateUrl('templates/addVehicle.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalVehicle = modal;
  });

  $scope.newCheckin = function(){
    $scope.checkin.vehicle = $scope.checkin.vehicle.toJSON();
    Parse.saveCheckin($scope.checkin).then(function(checkin){
      console.log(checkin);
      $state.go('app.checkin');
    },function(error){
      console.log(error);
    });
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

})
.controller('SnapsCtrl', function($scope, $state, $stateParams, $ionicModal, Parse, VehicleParser,CheckinParser) {

  $ionicModal.fromTemplateUrl('templates/addSnap.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modalSnap = modal;
  });

  $scope.openSnap = function() {
    $scope.modalSnap.show();
  };

  $scope.closeSnap = function() {
    $scope.modalSnap.hide();
  };


})
.controller('SnapCtrl', function($scope, $state, $stateParams, $ionicModal, Parse, VehicleParser,CheckinParser) {

});
