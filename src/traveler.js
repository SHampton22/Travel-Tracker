import dayjs from 'dayjs';

class Traveler {
  constructor(travelersData, tripsData, destinationsData) {
    this.travelersData = travelersData;
    this.tripsData = tripsData;
    this.destinationsData = destinationsData;
  };

  findTraveler(travelerId) {
    return this.travelersData.find(traveler => traveler.id === travelerId);
  };

  filterTripsByTraveler(travelerId) {
    return this.tripsData.filter(trip => trip.userID === travelerId);
  };

  filterTravelersTripsByStatus(travelerId, status) {
   return this.findTripsByTraveler(travelerId).filter(trip => trip.status === status);
  };

  filterTripsByTime(travelerId, tripTime, status) {
    if (tripTime === 'pastTrips') {
      return this.findTravelersTripsByStatus(travelerId, status).filter(trip => dayjs(trip.date).isBefore("2020/05/01"));
    } else if (tripTime === 'futureTrips') {
      return this.findTravelersTripsByStatus(travelerId, status).filter(trip => dayjs(trip.date).isAfter("2020/05/01"));
    }  
  };

  filterTraverlsTripsByYear(travelerId, year) {
    return this.findTripsByTraveler(travelerId).filter(trip => trip.date.includes(year));
  };

  calculateYearlyExpense(travelerId, year) {
    return this.filterTraverlsTripsByYear(travelerId, year).reduce((yearlyExpense, trip) => {
      const matchingDestination = this.destinationsData.find(destination => destination.id === trip.destinationID);
      const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
      const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
      const tripCost = lodgingTotal + flightTotal;
      const agentFee = tripCost * .10;
      const tripTotal = tripCost + agentFee;
      yearlyExpense += tripTotal;
      return yearlyExpense;
    }, 0);
  };
  

}





export default Traveler;