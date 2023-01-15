// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import './css/styles.css';
import { fetchData } from './apiCalls';
import Traveler from './Traveler';

let welcomeTraveler = document.querySelector('#welcomeTraveler');
let displayTotalSpent = document.querySelector('#displayTotalSpent');
let logoutButton = document.querySelector('#logoutButton');
let pendingTrips = document.querySelector('#pendingTrips');
let futureTrips = document.querySelector('#futureTrips');
let pastTrips = document.querySelector('#pastTrips');
let destinationsDropDown = document.querySelector('#destinationsDropDown');
let form = document.querySelector('.form');
let postResponseMessage = document.querySelector(".post-Response-Message");
let loginPage = document.querySelector('.login-page');
let nav = document.querySelector('.nav');
let main = document.querySelector('.main');
let loginButton = document.querySelector('.loginButton');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let loginResponseMessage = document.querySelector('.login-response-message');
let loginForm = document.querySelector('.login-form');

let travelersData;
let tripsData;
let destinationsData;
let traveler 
let currentTraveler;

const getFetch = () => {
  fetchData()
  .then(data => {
      console.log('data', data[0].travelers)
      travelersData = data[0].travelers
      tripsData = data[1].trips
      destinationsData = data[2].destinations
      traveler = new Traveler(travelersData, tripsData, destinationsData);
      assignUsernames();
      
  });
};

window.addEventListener('load', 
getFetch);

loginButton.addEventListener('click', (event) => {
  event.preventDefault();
  validateUser();
  
})

logoutButton.addEventListener('click', (event => {
  nav.classList.add('hidden');
  main.classList.add('hidden');
  loginPage.classList.remove('hidden');
}))

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newTrip = {
    id: tripsData.length + 1,
    userID: currentTraveler.id,
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

function assignUsernames() {
  return travelersData.forEach(traveler => {
    traveler.username = `traveler${traveler.id}`
  });
};

function validateUser(event) {
  
  currentTraveler = travelersData.find(traveler => traveler.username === username.value)
  if (password.value === 'travel' && username.value === currentTraveler.username) {
    displayTravelerPage();
    nav.classList.remove('hidden');
    main.classList.remove('hidden');
    loginPage.classList.add('hidden');
  } else {
    loginResponseMessage.classList.remove('hidden');
  }
  loginForm.reset();
};

function updateYearlySpent() {
  displayTotalSpent.innerText = `You have invested $${traveler.calculateYearlyExpense(currentTraveler.id, '2020')} in travel for 2020!`
  welcomeTraveler.innerText = `Welcome, ${traveler.findTraveler(currentTraveler.id).name}`;
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
    .then(() => {
      getFetch()
      displayTravelerPage()
    })
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
