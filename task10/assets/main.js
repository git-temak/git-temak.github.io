const selectedCountry = document.getElementById("country");
const countryName = document.getElementById("country-name");
const flag = document.getElementById("flag");
const capital = document.getElementById("capital");
const continent = document.getElementById("continent");
const subRegion = document.getElementById("sub-region");
const currency = document.getElementById("currency");
const language = document.getElementById("language");
const countrySection = document.querySelector(".country-info");

document.addEventListener('DOMContentLoaded', () => {

	selectedCountry.onchange = () => {
		fetch('https://restcountries.eu/rest/v2/all')
		.then(response => response.json())
		.then(data => {
			let values = Object.values(data);
			values.forEach(country => {
				if (selectedCountry.value == country.alpha3Code) {
					countrySection.style.display = "block";
					countryName.innerHTML = country.name;
					flag.src = country.flag;
					capital.innerHTML = country.capital;
					continent.innerHTML = country.region;
					subRegion.innerHTML = country.subregion;
					currency.innerHTML = `${country.currencies[0].name} (${country.currencies[0].symbol})`;
					const langs = [];
					country.languages.forEach(lang => langs.push(lang.name));
					language.innerHTML = langs.join(', ');
				}
			})
		})
		.catch(error => console.log(error))

		if(selectedCountry.value == "") {
			countrySection.style.display = "none";
		}
	}
})