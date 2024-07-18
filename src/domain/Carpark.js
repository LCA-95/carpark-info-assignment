class Carpark {
  constructor({
    id,
    carParkNo,
    address,
    xCoordinate,
    yCoordinate,
    carParkType,
    parkingSystemType,
    shortTermParking,
    freeParking,
    isNightParkingAllowed,
    carParkDeckQuantity,
    gantryHeight,
    isBasementCarpark,
  }) {
    this.id = id;
    this.carParkNo = carParkNo;
    this.address = address;
    this.xCoordinate = xCoordinate;
    this.yCoordinate = yCoordinate;
    this.carParkType = carParkType;
    this.parkingSystemType = parkingSystemType;
    this.shortTermParking = shortTermParking;
    this.freeParking = freeParking;
    this.isNightParkingAllowed = isNightParkingAllowed;
    this.carParkDeckQuantity = carParkDeckQuantity;
    this.gantryHeight = gantryHeight;
    this.isBasementCarpark = isBasementCarpark;
  }

  // Sample Domain Function
  getFormattedFreeParkingDescription() {
    if (!this.freeParking) {
      return "-";
    }
  }
}

module.exports = Carpark;
