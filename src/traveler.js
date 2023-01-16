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
   return this.filterTripsByTraveler(travelerId).filter(trip => trip.status === status);
  };

  filterTripsByTime(travelerId, tripTime, status) {
    if (tripTime === 'pastTrips') {
      return this.filterTravelersTripsByStatus(travelerId, status).filter(trip => dayjs(trip.date).isBefore("2020/05/01"));
    } else if (tripTime === 'futureTrips') {
      return this.filterTravelersTripsByStatus(travelerId, status).filter(trip => dayjs(trip.date).isAfter("2020/05/01"));
    }  
  };

  filterTraverlsTripsByYear(travelerId, year) {
    return this.filterTripsByTraveler(travelerId).filter(trip => trip.date.includes(year));
  };

  calculateYearlyExpense(travelerId, status) {
    const totalExpense = this.filterTravelersTripsByStatus(travelerId, status).reduce((yearlyExpense, trip) => {
      const matchingDestination = this.destinationsData.find(destination => destination.id === trip.destinationID);
      const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
      const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
      const tripCost = lodgingTotal + flightTotal;
      const agentFee = tripCost * .10;
      const tripTotal = tripCost + agentFee;
      yearlyExpense += tripTotal;
      return yearlyExpense
    }, 0)
    return totalExpense;
  };
  

}





export default Traveler;