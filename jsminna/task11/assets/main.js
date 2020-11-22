const dataSection = document.getElementById("main-data");
const search = document.getElementById("search");
const spinner = document.getElementById("spinner");
const toggler = document.querySelector(".toggler");

document.addEventListener('DOMContentLoaded', () => {
	// dark mode toggler
	toggler.addEventListener('click', () => {
	    document.body.classList.toggle("dark-mode");
	})

	// show the spinner once we start fetching data
	spinner.removeAttribute('hidden');

	fetch('https://emajency.com/js/numbers.json')
	.then(response => response.json())
	.then(data => {
		// create container and row where all results would be displayed
		const container = document.createElement("div");
		container.classList.add("container");
		const row = document.createElement("div");
		row.classList.add("row");

		// loop through the api and create elements to hold each area information
		data.forEach(area => {
			const phoneCard = document.createElement("div");
			phoneCard.classList.add("phone-card");
			const areaName = document.createElement("span");
			areaName.innerText = area.name;
			const areaNumber = document.createElement("a");
			areaNumber.href = `tel:${area.number}`;
			areaNumber.innerHTML = `<svg version="1.1" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink" id="phone-icon">
	                            <g transform="translate(-2253.4 -975.87)"><g transform="translate(2459.2 -208.03)">
	                            <circle class="phone-bg-circ" cx="-169.8" cy="1219.9" r="35"/>
	                            <path d="m-194.23 1230.4c-0.0377 0.8926-0.0503 1.76-0.0503 2.6653 0.21376 1.8982 0.77944 3.7966 1.6595 5.5064 1.5212 2.3006 3.5956 4.199 6.0345 5.5568 1.5715 0.8423 3.3817 1.0183 5.0539 0.4777 17.022-5.3556 30.361-18.644 35.83-35.629 0.60351-1.9361 0.40241-4.0732-0.61596-5.8208-0.76693-1.2948-1.6092-2.5143-2.6024-3.5577-2.3505-2.4269-5.3681-3.9854-8.6368-4.5888-0.38969-0.088-0.84231 0.063-1.144 0.3645-0.1509 0.1509-0.26396 0.3898-0.30172 0.6035l-3.2311 12.886c-0.17599 0.6537 0.21376 1.3451 0.88007 1.5337l4.0105 1.1692c0.23879 0.063 0.41486 0.1886 0.56568 0.3394 0.51548 0.5155 0.49024 1.3201-0.0252 1.8356l-19.323 19.323c-0.51548 0.5155-1.32 0.5407-1.8355 0.025-0.176-0.176-0.28907-0.415-0.352-0.6537l-0.46507-2.4516c-0.15089-0.6286-0.69155-1.0434-1.2949-1.0435l-12.886 0.2641c-0.3269 0.025-0.62855 0.1509-0.86741 0.3897-0.21376 0.2138-0.33948 0.5154-0.40235 0.8046z" fill="#0fcb9b"/></g></g>
		                        </svg>`;
			phoneCard.appendChild(areaName);
			phoneCard.appendChild(areaNumber);
			row.appendChild(phoneCard);
		})

		// append container and row respectively
		container.appendChild(row);
		dataSection.appendChild(container);

		// remove the spinner 1 sec after result is done loading
		setTimeout(() => {
			spinner.setAttribute('hidden', '')
		}, 1000);
	})
	.catch(error => console.log(error))

	// search through the results
	const searchNumbers = () => {
		dataRow = document.querySelector(".row");

		filter = search.value.toUpperCase();
		card = dataRow.getElementsByTagName("div");

		for (i = 0; i < card.length; i++) {
		    searchName = card[i].getElementsByTagName("span")[0];
		    if (searchName) {
				txtValue = searchName.textContent || searchName.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					card[i].classList.remove("dnone");
				} else {
					card[i].classList.add("dnone");
					if (dataSection.clientHeight == "0"){
						const errorText = document.createElement("div");
						errorText.innerText = 'There are no results for your query. Please try again.'
						dataRow.appendChild(errorText);
					}
				}
		    }
		}
	}

	search.onkeyup = searchNumbers;

})