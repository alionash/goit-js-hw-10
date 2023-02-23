const URL = 'https://restcountries.com/v3.1/name/';
function fetchCountries(countryName) {
    return fetch(`${URL}/${countryName}?fields=name,capital,population,flags,languages`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error data!');
            }
            return response.json();
        })
};


export default fetchCountries;