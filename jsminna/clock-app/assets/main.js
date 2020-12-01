const main = document.getElementById('main');
const container = document.querySelector('.container');
const quoteSection = document.querySelector('.quotes');
const greeting = document.querySelector('.greeting');
const timeEl = document.querySelector('.cur-time');
const timezoneEl = document.querySelector('.cur-timezone');
const locationEl = document.querySelector('.location');
const revealSection = document.querySelector('.reveal-section');
const infoSection = document.querySelector('.info');
const infoLeft = document.querySelector('.left-half');
const infoRight = document.querySelector('.right-half');
const currentTime = new Date();

//get browsers timezone in IANA format
currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
continent = currentTimezone.substring(0, currentTimezone.indexOf('/'));
timezoneLocation = currentTimezone.substring(currentTimezone.indexOf('/') + 1);

document.addEventListener('DOMContentLoaded', () => {
	// create quotes elements and display info
	quotesDiv = document.createElement('div');
	quote = document.createElement('span');
	quoteAuthor = document.createElement('h3');
		
	// function to generate random quote
	const randomQuote = () => {
		randomNum = Math.floor(Math.random() * quotes.length);
		quoteText = quotes[randomNum].quote
		quote.innerText = `"${quoteText}"`;
		quoteAuthor.innerText = quotes[randomNum].author;
	}
	randomQuote();
	quotesDiv.appendChild(quote);
	quotesDiv.appendChild(quoteAuthor);
	quoteSection.appendChild(quotesDiv);

	// refresh button
	refresh = document.createElement('span');
	refresh.classList.add('refresh');
	refresh.innerHTML = `<i class="fa fa-refresh"></i>`;
	quoteSection.appendChild(refresh);

	//current browser time
	timeEl.innerHTML = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	locationEl.innerText = `in ${timezoneLocation}, ${continent}`;
	timezoneEl.innerText = moment().tz(currentTimezone).zoneAbbr();

	// create and append greeting message and icon
	icon = document.createElement('span');
	icon.innerHTML = `<span class="iconify" data-icon="bi:brightness-high-fill"></span>`;
	greetingText = document.createElement('span');
	greeting.classList.add('daytime');
	greetingText.innerText = 'good morning, its currently';
	// mobile text
	if (window.innerWidth < 500) {
		greetingText.innerText = 'good morning';
	}
	greeting.appendChild(icon);
	greeting.appendChild(greetingText);

	// change text and icon once its afternoon or evening
	if (currentTime.getHours() >= 12) {
		greetingText.innerText = 'good afternoon, its currently';
		if (window.innerWidth < 500) {
			greetingText.innerText = 'good afternoon';
		}
	} if (currentTime.getHours() >= 17) {
		main.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./assets/img/night-header.jpg')";
		greetingText.innerText = 'good evening, its currently';
		icon.innerHTML = `<span class="iconify" data-icon="bi:moon"></span>`;
		if (window.innerWidth < 500) {
			greetingText.innerText = 'good evening';
		}
	}

	const reveal = document.createElement('div');
	reveal.classList.add('reveal');
	reveal.innerText = 'more';
	revealSection.appendChild(reveal);
	const revealBtnIcon = document.createElement('span');
	revealBtnIcon.innerHTML = `<span class="iconify" data-icon="bx:bx-chevron-down" data-inline="false"></span>`;
	reveal.appendChild(revealBtnIcon);

	const refreshBtn = document.querySelector('.fa-refresh');
	
	refreshBtn.onclick = () => {
		randomQuote();
		refreshBtn.classList.add('fa-spin');
		setTimeout(() => {
			refreshBtn.classList.remove('fa-spin');
		}, 500);
	}

	const revealBtn = document.querySelector('.reveal');

	const createInfoSection = () => {
		container.style.height = '50%';
		reveal.innerText = 'less';
		revealBtnIcon.innerHTML = `<span class="iconify" data-icon="bx:bx-chevron-up" data-inline="false"></span>`;
		reveal.appendChild(revealBtnIcon);
		revealBtn.classList.add('less-btn');

		// create the elements in additional info section
		infoTimezone = document.createElement('h3');
		infoTimezone.innerText = 'current timezone';
		infoLeft.appendChild(infoTimezone);
		infoTimezoneData = document.createElement('p');
		infoTimezoneData.innerText = currentTimezone;
		infoLeft.appendChild(infoTimezoneData);
		infoDOY = document.createElement('h3');
		infoDOY.innerText = 'day of the year';
		infoLeft.appendChild(infoDOY);
		// calculate number of days into the year
		const daysIntoYear = (Date.UTC(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()) - Date.UTC(currentTime.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
		infoDaysIntoYear = document.createElement('p');
		infoDaysIntoYear.innerText = daysIntoYear;
		infoLeft.appendChild(infoDaysIntoYear);

		infoDOW = document.createElement('h3');
		infoDOW.innerText = 'day of the week';
		infoRight.appendChild(infoDOW);
		infoDayofWeek = document.createElement('p');
		infoDayofWeek.innerText = currentTime.getDay() + 1;
		infoRight.appendChild(infoDayofWeek);
		infoWkNo = document.createElement('h3');
		infoWkNo.innerText = 'week number';
		infoRight.appendChild(infoWkNo);
		infoWeekNo = document.createElement('p');
		infoWeekNo.innerText = moment(currentTime).week();
		infoRight.appendChild(infoWeekNo);

		quoteSection.style.display = 'none';
		infoSection.style.display = 'flex';
	}

	revealBtn.onclick = () => {
		if (infoSection.style.display == '') {
			createInfoSection();

			// afternoon/evening customisations
			if (currentTime.getHours() >= 17) {
				infoSection.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))";
				infoLeft.childNodes.forEach(element => element.style.color = 'white');
				infoRight.childNodes.forEach(element => element.style.color = 'white');
			} 
		}	else if (infoSection.style.display === 'flex') {
			const hideBtn = document.querySelector('.less-btn');
			hideBtn.onclick = () => {
				container.style.height = '90%';
				// reveal.innerText = 'more';
				// revealBtnIcon.innerHTML = `<span class="iconify" data-icon="bx:bx-chevron-down" data-inline="false"></span>`;
				// reveal.appendChild(revealBtnIcon);
				revealBtn.classList.remove('less-btn');
				quoteSection.style.display = 'flex';
				infoSection.style.display = 'none';
			}
		}
	}

	// const hideButton = () => {
	// 	const hideBtn = document.querySelector('.less-btn');
	// 	hideBtn.onclick = () => {
	// 		container.style.height = '90%';
	// 		reveal.innerText = 'more';
	// 		revealBtnIcon.innerHTML = `<span class="iconify" data-icon="bx:bx-chevron-down" data-inline="false"></span>`;
	// 		reveal.appendChild(revealBtnIcon);
	// 		revealBtn.classList.remove('less-btn');
	// 		quoteSection.style.display = 'flex';
	// 		infoSection.style.display = 'none';

	// 		console.log(revealBtn);
	// 	}
	// }
})