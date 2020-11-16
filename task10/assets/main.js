const menuToggle = () => {
    const navs = document.querySelectorAll('.navbarItems');
    navs.forEach(nav => nav.classList.toggle('navbarToggleShow'));
}
  
document.querySelector('.navbarToggle').addEventListener('click', menuToggle);

const selectedCountry = document.getElementById("country");

document.addEventListener('DOMContentLoaded', () => {

	selectedCountry.onchange = () => {
		fetch('https://restcountries.eu/rest/v2/all')
		.then(response => response.json())
		.then(data => {
			let values = Object.values(data);
			values.forEach(country => {
				if (selectedCountry.value == country.alpha3Code) {
					console.log("we selected:", country.name)
					console.log("country:", country)
				}
			})
		})
		.catch(error => console.log(error))
	}
})