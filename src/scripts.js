// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import { fetchData } from './apiCalls';
import Traveler from './Traveler';

let welcomeTraveler = document.querySelector('#welcomeTraveler');
let displayTotalSpent = document.querySelector('#displayTotalSpent');
let pendingTrips = document.querySelector('#pendingTrips');
let futureTrips = document.querySelector('#futureTrips');
let pastTrips = document.querySelector('#pastTrips');
let destinationsDropDown = document.querySelector('#destinationsDropDown');
let form = document.querySelector('.form');
let postResponseMessage = document.querySelector(".post-Response-Message");

let travelersData;
let tripsData;
let destinationsData;
let traveler 
let currentTraveler = {
    id: 7,
    name: "Emmet Sandham",
    travelerType: "relaxer"
  }

const getFetch = () => {
  fetchData()
  .then(data => {
      console.log('data', data[0].travelers)
      travelersData = data[0].travelers
      tripsData = data[1].trips
      destinationsData = data[2].destinations
      traveler = new Traveler(travelersData, tripsData, destinationsData);
      displayTravelerPage();
  });
};

window.addEventListener('load', getFetch);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newTrip = {
    id: tripsData.length + 1,
    userID: currentTraveler.id,
    destinationID: Number(formData.get('destination')),
    travelers: Number(formData.get('numberTraveling')),
    date: formData.get('tripDate').replaceAll("-", "/"),
    duration: Number(formData.get('duration')),
    status: 'pending',
    suggestedActivities: []
  };
  postData(newTrip)
  event.target.reset();
});

function displayTravelerPage() {
  displayTravelerInfo();
  displayPendingTrips();
  displayFutureTrips();
  displayPastTrips();
  createDestinationsDropDown();
};

function displayTravelerInfo() {
  displayTotalSpent.innerText = `You have invested $${traveler.calculateYearlyExpense(currentTraveler.id, 'approved').toLocaleString()} in travel!`
  welcomeTraveler.innerText = `Welcome, ${currentTraveler.name}`;
};

function createDestinationsDropDown() {
  traveler.destinationsData.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  });
};

function displayPendingTrips() {
  pendingTrips.innerHTML = '';
  return traveler.filterTravelersTripsByStatus(currentTraveler.id, 'pending').forEach(trip => {
    const matchingDestination = traveler.destinationsData.find(destination => destination.id === trip.destinationID)
    const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
    const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
    const tripCost = lodgingTotal + flightTotal;
    const agentFee = tripCost * .10;
    const tripTotal = tripCost + agentFee;
   
    pendingTrips.innerHTML +=
      `<article class="card">
          <header class="card-header">
            <h4>${matchingDestination.destination}</h4>
          </header>
            <div class="card-body">
              <img class="destination-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}" width="180" height="400"/>
            </div>
          <footer class="card-footer">
            <p>Check-in: ${trip.date}</p>
            <p>Number of Travelers: ${trip.travelers}</p>
            <p>Trip Duration: ${trip.duration} days</p>
            <p>Status: ${trip.status} approval</p>
            <p>Estimated Investment: $${tripTotal.toLocaleString()}</p>
          </footer>
        </article>`;
  });
};
  
function displayPastTrips() {
  pastTrips.innerHTML = '';
  return traveler.filterTripsByTime(currentTraveler.id, 'pastTrips', 'approved').forEach(trip => {
      const matchingDestination = traveler.destinationsData.find(destination => destination.id === trip.destinationID)
      const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
      const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
      const tripCost = lodgingTotal + flightTotal;
      const agentFee = tripCost * .10;
      const tripTotal = tripCost + agentFee;
      pastTrips.innerHTML +=
      `<article class="card">
          <header class="card-header">
            <h4>${matchingDestination.destination}</h4>
          </header>
          <div class="card-body">
            <img class="destination-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}" width="180" height="400"/>
          </div>
          <footer class="card-footer">
            <p>Check-in: ${trip.date}</p>
            <p>Trip Duration: ${trip.duration} days</p>
            <p>Number of Travelers: ${trip.travelers}</p>
            <p>Status: ${trip.status}</p>
            <p>Total Investment: $${tripTotal.toLocaleString()}</p>
          </footer>
        </article>`;
    });
  };

function displayFutureTrips() {
  futureTrips.innerHTML = '';
  return traveler.filterTripsByTime(currentTraveler.id, 'futureTrips', 'approved').forEach(trip => {
    const matchingDestination = traveler.destinationsData.find(destination => destination.id === trip.destinationID)
    const lodgingTotal = trip.duration * matchingDestination.estimatedLodgingCostPerDay;
    const flightTotal = trip.travelers * matchingDestination.estimatedFlightCostPerPerson;
    const tripCost = lodgingTotal + flightTotal;
    const agentFee = tripCost * .10;
    const tripTotal = tripCost + agentFee;
    futureTrips.innerHTML +=
      `<article class="card">
          <header class="card-header">
            <h4>${matchingDestination.destination}</h4>
          </header>
          <div class="card-body">
            <img class="destination-image" src="${matchingDestination.image}" alt="${matchingDestination.alt}" width="180" height="400"/>
          </div>
          <footer class="card-footer">
            <p>Check-in: ${trip.date}</p>
            <p>Trip Duration: ${trip.duration} days</p>
            <p>Number of Travelers: ${trip.travelers}</p>
            <p>Status: ${trip.status}</p>
            <p>Total Investment: $${tripTotal.toLocaleString()}</p>
          </footer>
        </article>`;
  });
};

function postData(newTrip) {
  console.log(tripsData)
  console.log(newTrip)
  fetch(`http://localhost:3001/api/v1/trips`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTrip)
  })
    .then(response => {
      if (!response.ok) { 
        showPostResult('unknown');
        throw Error(response.statusText);
     } else {
        showPostResult('success');
        return response.json();
    }
    })
    .then(() => getFetch())
    .catch(() => showPostResult('unknown'));
};

function showPostResult(response) {
  form.classList.add('hidden');
  postResponseMessage.classList.remove('hidden');
  if (response === 'success') {
    postResponseMessage.innerText = 'Success! Your new trip is now pending approval!';
  } else {
    form.classList.add('hidden');
    postResponseMessage.innerText = 'Something went wrong, please try again later';
  }
  setTimeout(hideResponseMessage, 4000);
};

function hideResponseMessage() {
	form.classList.remove('hidden');
	postResponseMessage.classList.add('hidden');
};

console.log('This is the JavaScript entry file - your code begins here.');