const greeting = document.querySelector('.greeting');
const daytimeIcon = document.querySelector('.daytime-icon');
const timeEl = document.querySelector('.cur-time');
const timezoneEl = document.querySelector('.cur-timezone');
const locationEl = document.querySelector('.location');
const currentTime = new Date();

//get browsers timezone in IANA format
currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
continent = currentTimezone.substring(0, currentTimezone.indexOf('/'));
timezoneLocation = currentTimezone.substring(currentTimezone.indexOf('/') + 1);

document.addEventListener('DOMContentLoaded', () => {
	timeEl.innerHTML = currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
	locationEl.innerText = `in ${timezoneLocation}, ${continent}`;
	timezoneEl.innerText = moment().tz(currentTimezone).zoneAbbr();

	// create and append greeting message and icon
	icon = document.createElement('span');
	icon.innerHTML = `<span class="iconify daytime-icon" data-icon="bi:brightness-high-fill"></span>`;
	greetingText = document.createElement('span');
	greeting.classList.add('daytime');
	greetingText.innerText = 'good morning, its currently';
	greeting.appendChild(icon);
	greeting.appendChild(greetingText);

	// change text and icon once its evening
	if (currentTime.getHours() >= 12) {
		greetingText.innerText = 'good evening, its currently';
		icon.innerHTML = `<span class="iconify daytime-icon" data-icon="bi:moon"></span>`;
	}
})