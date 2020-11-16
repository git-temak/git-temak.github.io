const table = document.getElementById("country-table");
const tableBody = document.getElementById("table-body");

const spinner = document.getElementById("spinner");

document.addEventListener('DOMContentLoaded', () => {

	spinner.removeAttribute('hidden');

	fetch('https://restcountries.eu/rest/v2/all')
	.then(response => response.json())
	.then(data => {		
		let values = Object.values(data);
		values.reverse().forEach(country => {
			const row = tableBody.insertRow(0);
			const cell1 = row.insertCell(0);
			const cell2 = row.insertCell(1);
			const cell3 = row.insertCell(2);
			const cell4 = row.insertCell(3);
			const cell5 = row.insertCell(4);
			const cell6 = row.insertCell(5);
			const cell7 = row.insertCell(6);

			const langs = [];
			country.languages.forEach(lang => langs.push(lang.name));

			cell1.innerHTML = `<img src="${country.flag}" alt="">`;
			cell2.innerHTML = country.name;
			cell3.innerHTML = country.capital;
			cell4.innerHTML = country.region;
			cell5.innerHTML = country.subregion;
			cell6.innerHTML = `${country.currencies[0].name} (${country.currencies[0].symbol})`;
			cell7.innerHTML = langs;
		})

		setTimeout(() => {
			spinner.setAttribute('hidden', '')
			table.removeAttribute('hidden', '')
		}, 1000);
	})
	.catch(error => console.log(error))

})