// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import { fetchData } from './apiCalls';
import Traveler from './Traveler';

let welcomeTraveler = document.querySelector('#welcomeTraveler');
let displayTotalSpent = document.querySelector('#displayTotalSpent');
let logOutButton = document.querySelector('#logOutButton');
let pastTrips = document.querySelector('#pastTrips');
let futureTrips = document.querySelector('#futureTrips');
let pendingTrips = document.querySelector('#pendingTrips');
let destinationsDropDown = document.querySelector('#destinationsDropDown');

let travelersData;
let tripsData;
let destinationsData;
let traveler 
let currentTraveler = 38;

const getFetch = () => {
  fetchData()
  .then(data => {
      console.log('data', data[0].travelers)
      travelersData = data[0].travelers
      tripsData = data[1].trips
      destinationsData = data[2].destinations
      traveler = new Traveler(travelersData, tripsData, destinationsData);
      displayTravelerPage()
  });
  
}

window.addEventListener('load', getFetch);


function displayTravelerPage() {
  updateYearlySpent();
  displayPendingTrips();
  displayFutureTrips();
  displayPastTrips();
  createDestinationsDropDown();
  

};

function updateYearlySpent() {
  displayTotalSpent.innerText = `You have invested $${traveler.calculateYearlyExpense(currentTraveler, '2020')} in travel for 2020!`
  welcomeTraveler.innerText = `Welcome, ${traveler.findTraveler(currentTraveler).name}`;
};

function createDestinationsDropDown() {
  traveler.destinationsData.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  });
};

function displayPendingTrips() {
  return traveler.filterTravelersTripsByStatus(currentTraveler, 'pending').forEach(trip => {
    const matchingDestination = traveler.destinationsData.find(destination => destination.id === trip.destinationID)
    const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
    const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
    const tripCost = lodgingTotal + flightTotal;
    const agentFee = tripCost * .10;
    const tripTotal = tripCost + agentFee;
    pendingTrips.innerHTML +=
      `<article class="card">
          <header class="card-header">
            <h3>Destination: ${matchingDestination.destination}</h3>
            <p>Start Date: ${trip.date}</p>
            </header>
          <div class="card-body">
            <img class="destination-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}"/>
            <p>Length of Stay: ${trip.duration} days</p>
            <p>Number of Travelers: ${trip.travelers}</p>
          </div>
          <footer class="card-footer">
            <p>Status: ${trip.status}</p>
            <p>Total Investment: $${tripTotal}</p>
          </footer>
        </article>`;
  });
};
  
function displayPastTrips() {
  return traveler.filterTripsByTime(currentTraveler, 'pastTrips', 'approved').forEach(trip => {
      const matchingDestination = traveler.destinationsData.find(destination => destination.id === trip.destinationID)
      const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
      const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
      const tripCost = lodgingTotal + flightTotal;
      const agentFee = tripCost * .10;
      const tripTotal = tripCost + agentFee;
      pastTrips.innerHTML +=
        `<article class="card">
            <header class="card-header">
              <h3>Destination: ${matchingDestination.destination}</h3>
              <p>Start Date: ${trip.date}</p>
              </header>
            <div class="card-body">
              <img class="destination-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}"/>
              <p>Length of Stay: ${trip.duration} days</p>
              <p>Number of Travelers: ${trip.travelers}</p>
            </div>
            <footer class="card-footer">
              <p>Status: ${trip.status}</p>
              <p>Total Investment: $${tripTotal}</p>
            </footer>
          </article>`;
    });
  };

function displayFutureTrips() {
  return traveler.filterTripsByTime(currentTraveler, 'futureTrips', 'approved').forEach(trip => {
    const matchingDestination = traveler.destinationsData.find(destination => destination.id === trip.destinationID)
    const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
    const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
    const tripCost = lodgingTotal + flightTotal;
    const agentFee = tripCost * .10;
    const tripTotal = tripCost + agentFee;
    futureTrips.innerHTML +=
      `<article class="card">
          <header class="card-header">
            <h3>Destination: ${matchingDestination.destination}</h3>
            <p>Start Date: ${trip.date}</p>
            </header>
          <div class="card-body">
            <img class="destination-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}"/>
            <p>Length of Stay: ${trip.duration} days</p>
            <p>Number of Travelers: ${trip.travelers}</p>
          </div>
          <footer class="card-footer">
            <p>Status: ${trip.status}</p>
            <p>Total Investment: $${tripTotal}</p>
          </footer>
        </article>`;
  });
};


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
