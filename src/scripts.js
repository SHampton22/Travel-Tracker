// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import { fetchData } from './apiCalls';
import Traveler from './Traveler';

let welcomeTraveler = document.querySelector('#welcomeTraveler');
let displayTotalSpent = document.querySelector('#displayTotalSpent');
let logOutButton = document.querySelector('#logOutButton');
let pendingTrips = document.querySelector('#pendingTrips');
let futureTrips = document.querySelector('#futureTrips');
let pastTrips = document.querySelector('#pastTrips');
let destinationsDropDown = document.querySelector('#destinationsDropDown');
let form = document.querySelector('.form');
let postResponseMessage = document.querySelector(".post-Response-Message");
// let submitFormButton = document.querySelector('#submitFormButton');

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
};

window.addEventListener('load', getFetch);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newTrip = {
    id: tripsData.length + 1,
    userID: currentTraveler,
    destinationID: Number(formData.get('destination')),
    travelers: Number(formData.get('numberTraveling')),
    date: formData.get('date').replaceAll("-", "/"),
    duration: Number(formData.get('duration')),
    status: 'pending',
    suggestedActivities: []
  };
  postData(newTrip);
  event.target.reset();
});


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



function postData(newTrip) {
  console.log(destinationsData)
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



// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
