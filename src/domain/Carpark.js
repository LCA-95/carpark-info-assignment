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
    carParkDecks,
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
    this.carParkDecks = carParkDecks;
    this.gantryHeight = gantryHeight;
    this.isBasementCarpark = isBasementCarpark;
  }
}

module.exports = Carpark;
