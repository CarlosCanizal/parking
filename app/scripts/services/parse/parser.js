angular.module('Parking.services').
factory('VehicleParser', function() {

  var Vehicle = Parse.Object.extend("Vehicle", {
      // Instance methods
    }, {
      // Class methods
    }
  );

  //name property
  Vehicle.prototype.__defineGetter__("name", function() {
    return this.get("name");
  });
  Vehicle.prototype.__defineSetter__("name", function(aValue) {
    return this.set("name", aValue);
  });

  // plate property
  Vehicle.prototype.__defineGetter__("plate", function() {
    return this.get("plate");
  });
  Vehicle.prototype.__defineSetter__("plate", function(aValue) {
    return this.set("plate", aValue);
  });

  // image property
  Vehicle.prototype.__defineGetter__("image", function() {
    return this.get("image");
  });
  Vehicle.prototype.__defineSetter__("image", function(aValue) {
    return this.set("image", aValue);
  });

  return Vehicle;

}).
factory('CheckinParser', function() {

  var Checkin = Parse.Object.extend("Checkin", {
      // Instance methods
    }, {
      // Class methods
    }
  );

  //plate property
  Checkin.prototype.__defineGetter__("plate", function() {
    return this.get("plate");
  });
  Checkin.prototype.__defineSetter__("plate", function(aValue) {
    return this.set("plate", aValue);
  });

  // time property
  Checkin.prototype.__defineGetter__("time", function() {
    return this.get("time");
  });
  Checkin.prototype.__defineSetter__("time", function(aValue) {
    return this.set("time", aValue);
  });

  return Checkin;

});