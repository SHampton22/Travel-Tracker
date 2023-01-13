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
let currentTraveler = 44;

const getFetch = () => {
  fetchData()
  .then(data => {
      console.log('data', data[0].travelers)
      travelersData = data[0].travelers
      tripsData = data[1].trips
      destinationsData = data[2].destinations
      traveler = new Traveler(travelersData, tripsData, destinationsData);
      updateYearlySpent();
  });
  
}

window.addEventListener('load', getFetch);


function displayTravelersPage(travelerId) {
  traveler.findTraveler(travelerId);
  

};

function updateYearlySpent() {
  displayTotalSpent.innerText = `You have invested $${traveler.calculateYearlyExpense(currentTraveler, '2020')} in travel for 2020!`
  welcomeTraveler.innerText = `Welcome, ${traveler.findTraveler(currentTraveler).name}`;
  pastTrips.innerText = traveler.filterTripsByTime(currentTraveler, 'pastTrips', 'approved');
  futureTrips.innerText = traveler.filterTripsByTime(currentTraveler, 'futureTrips', 'approved');
  pendingTrips.innerText = traveler.filterTravelersTripsByStatus(currentTraveler, 'pending');
  
}

function createDestinationsDropDown() {
  traveler.destinationsData.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  })
}
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
