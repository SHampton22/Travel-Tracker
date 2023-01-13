import chai from 'chai';
import Traveler from '../src/traveler';
const expect = chai.expect;

describe("Trip", () => {
  let traveler;
  let travelersData;
  let tripsData;
  let destinationsData;

  beforeEach(() => {
    travelersData = [{
      "id": 35,
      "name": "Lorilyn Barlowe",
      "travelerType": "shopper",
    },{
      "id": 44,
      "name": "Marijo MacNeilley",
      "travelerType": "photographer",
    },{
      "id": 45,
      "name": "Ofilia Hart",
      "travelerType": "thrill-seeker",
    },{
      "id": 46,
      "name": "Evanne Finnie",
      "travelerType": "relaxer",
    },{
      "id": 47,
      "name": "Den Dossettor",
      "travelerType": "relaxer",
    }];
    tripsData = [{
      "id": 2,
      "userID": 35,
      "destinationID": 25,
      "travelers": 5,
      "date": "2022/10/04",
      "duration": 18,
      "status": "approved",
      "suggestedActivities": []
    },{
      "id": 46,
      "userID": 44,
      "destinationID": 33,
      "travelers": 2,
      "date": "2020/08/24",
      "duration": 11,
      "status": "approved",
      "suggestedActivities": []
    },{
      "id": 48,
      "userID": 44,
      "destinationID": 14,
      "travelers": 6,
      "date": "2021/02/10",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    },{
      "id": 68,
      "userID": 44,
      "destinationID": 41,
      "travelers": 6,
      "date": "2020/09/19",
      "duration": 14,
      "status": "approved",
      "suggestedActivities": []
    },{
      "id": 161,
      "userID": 44,
      "destinationID": 48,
      "travelers": 6,
      "date": "2020/08/13",
      "duration": 15,
      "status": "approved",
      "suggestedActivities": []
    },
     ];
    destinationsData = [{
      "id": 14,
      "destination": "Marrakesh, Morocco",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 830,
      "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
      "alt": "people buying oranges and other fruit from a street vendor"
    },{
      "id": 25,
      "destination": "New York, New York",
      "estimatedLodgingCostPerDay": 175,
      "estimatedFlightCostPerPerson": 200,
      "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
    },{
      "id": 33,
      "destination": "Brussels, Belgium",
      "estimatedLodgingCostPerDay": 1000,
      "estimatedFlightCostPerPerson": 110,
      "image": "https://images.unsplash.com/photo-1559113202-c916b8e44373?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      "alt": "brown concrete gate"
    },{
      "id": 41,
      "destination": "Montego Bay, Jamaica",
      "estimatedLodgingCostPerDay": 500,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://images.unsplash.com/photo-1557129604-0e50f1300fab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      "alt": "boats docked beside trees on river"
    },{
      "id": 48,
      "destination": "Dar es Salaam, Tanzania",
      "estimatedLodgingCostPerDay": 1200,
      "estimatedFlightCostPerPerson": 100,
      "image": "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      "alt": "aerial photography of high-rise building"
    }];
    traveler = new Traveler(travelersData, tripsData, destinationsData);
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should be an instance of Trip", () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it("should store travelers data", function () {
		expect(traveler.travelersData).to.deep.equal(travelersData);
	});

  it("should store trips data", function () {
		expect(traveler.tripsData).to.deep.equal(tripsData);
	});

  it("should store destinations data", function () {
		expect(traveler.destinationsData).to.deep.equal(destinationsData);
	});

  it('should find a traveler by ID', () => {
    console.log()
    expect(traveler.findTraveler(7)).to.deep.equal(
      { id: 44, name: 'Marijo MacNeilley', travelerType: 'photographer' }
      );
  });

  it('should find all travelers trips', () => {
    console.log(traveler.filterTripsByTraveler(7))
    expect(traveler.filterTripsByTraveler(44)).to.deep.equal();
  });

  it('should find a travelers pending trips', () => {
    expect(traveler.filterTravelersTripsByStatus(44, 'pending')).to.deep.equal();
  });

  it('should find a travelers approved trips', () => {
    expect(traveler.filterTravelersTripsByStatus(44, 'approved')).to.deep.equal();
  });

  it('should find all past trips for a secific traveler', () => {
    expect(traveler.filterTripByTime(44, 'pastTrips', 'approved')).to.deep.equal();
  });

  it('should find all future trips for a secific traveler', () => {
    expect(traveler.filterTripByTime(44, 'pastTrips', 'approved')).to.deep.equal();
  });

  it('should find a travelers trips by year', () => {
    expect(traveler.filterTraverlsTripsByYear(44, '2022')).to.deep.equal();
  });
  
  it('should calculate a travelers total spent on trips for a year', () => {
    expect(traveler.calculateYearlyExpense(44, '2022')).to.equal()
  }); 
});