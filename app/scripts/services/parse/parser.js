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

});