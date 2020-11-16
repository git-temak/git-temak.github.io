const countryName = document.getElementById("country-name");
const flag = document.getElementById("flag");
const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const subRegion = document.getElementById("sub-region");
const currency = document.getElementById("currency");
const language = document.getElementById("language");
const countrySection = document.querySelector(".country-info");

const tableRow = document.createElement('tr');
const tableCell = document.createElement('td');

document.addEventListener('DOMContentLoaded', () => {

	fetch('https://restcountries.eu/rest/v2/all')
	.then(response => response.json())
	.then(data => {
		let values = Object.values(data);
		values.forEach(country => {
			tableCell.innerHTML = country.name;
			tableRow.append(tableCell);
			console.log(country.name);
			// countryName.innerHTML = country.name;
			// flag.src = country.flag;
			// capital.innerHTML = country.capital;
			// continent.innerHTML = country.region;
			// subRegion.innerHTML = country.subregion;
			// currency.innerHTML = `${country.currencies[0].name} (${country.currencies[0].symbol})`;
			// const langs = [];
			// country.languages.forEach(lang => langs.push(lang.name));
			// language.innerHTML = langs;
		})
	})
	.catch(error => console.log(error))

})