const quoteSection = document.querySelector('.quotes');
const greeting = document.querySelector('.greeting');
const timeEl = document.querySelector('.cur-time');
const timezoneEl = document.querySelector('.cur-timezone');
const locationEl = document.querySelector('.location');
const revealSection = document.querySelector('.reveal-section');
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
	greeting.appendChild(icon);
	greeting.appendChild(greetingText);

	// change text and icon once its evening
	if (currentTime.getHours() >= 12) {
		greetingText.innerText = 'good evening, its currently';
		icon.innerHTML = `<span class="iconify" data-icon="bi:moon"></span>`;
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
		setTimeout(() => {
			refreshBtn.classList.remove('fa-spin');
		}, 500);
	}
})