// import dayjs from 'dayjs';

// class Trip {
//   constructor(tripsData, destinationsData) {
//     this.tripsData = tripsData;
//     this.destinationsData = destinationsData;
//   };

//   findTripsByTraveler(travelerId) {
//     return this.tripsData.filter(trip => trip.userID === travelerId)
//   };

//   findPendingTrips(travelerId) {
//    return this.findTripsByTraveler(travelerId).filter(trip => trip.status === 'pending')
//   };

//   findTripByTime(travelerId, tripTime) {
//     if (tripTime === 'pastTrips') {
//       return this.findTripsByTraveler(travelerId).filter(trip => dayjs(trip.date).isBefore("2022/01/01"));
//     } else if (tripTime === 'futureTrips') {
//       return this.findTripsByTraveler(travelerId).filter(trip => dayjs(trip.date).isAfter("2022/01/01"));
//     }  };

// }





// export default Trip;