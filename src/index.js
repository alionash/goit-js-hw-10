import './css/styles.css';
import fetchCountries from './api/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    let countryName = e.target.value.trim();
    if (!countryName) {
        Notiflix.Notify.info('Please choose your country.');
        clearInput(countryList);
        clearInput(countryInfo);
        return;
    }
    
    fetchCountries(countryName).then(response => {
        if (response.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        } else if (response.length > 2 && response.length < 10) {
            clearInput(countryInfo);
            createCountryList(response);
        } else if (response.length === 1) {
            clearInput(countryList);
            clearInput(countryInfo);
            createCountryInfo(response);
        }
    }).catch(() => {
        clearInput(countryList);
        clearInput(countryInfo);
        Notiflix.Notify.failure("Oops, there is no country with that name");
    })
}

function createCountryList(array) {
    const markup = array.map(
        country => `<li class ="country-list-first"><img class="country-list-img" src='${country.flags.svg}' width = "50px" height = "30px">
        <span class="country-name">${country.name.official}</span></li>`
    ).join('')

    countryList.insertAdjacentHTML('beforeend', markup);
}

function createCountryInfo(array) {
    const markup = array.map(
        country => `<div class="title-box">
        <img class="country-img-info" src='${country.flags.svg}' width="50px" height="30px">
        <h1 class="country-name-title">${country.name.official}</h1>
    </div>
    <ul class="country-list-second">
        <li class="country-list-item">Capital: <span class="country-list-span">${country.capital}</span></li>
        <li class="country-list-item">Population: <span class="country-list-span">${country.population}</span></li>
        <li class="country-list-item">Languages: <span class="country-list-span">${Object.values(country.languages).join(', ')}</span></li>
    </ul>`
    ).join(' ');
    countryInfo.insertAdjacentHTML('beforeend', markup);
}


function clearInput(el) {
    el.innerHTML = ('');
}



