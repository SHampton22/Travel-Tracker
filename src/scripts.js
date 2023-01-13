import './css/styles.css';
import { fetchData } from './apiCalls'

let travelers;
let trips;
let destinations;


const getFetch = () => {
  fetchData()
  .then(data => {
      console.log('data', data)
      travelers = data[0].travelers
      trips = data[1].trips
      destinations = data[2].destinations
  })
}

window.addEventListener('load', getFetch)
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
