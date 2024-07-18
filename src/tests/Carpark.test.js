const Carpark = require("../domain/Carpark");

describe("Carpark Domain Function Unit Testing", () => {
  it("Get Formatted Response for Free Parking is null", () => {
    const carPark = new Carpark({ id: 1 });

    expect(carPark.getFormattedFreeParkingDescription()).toBe("-");
  });
});
