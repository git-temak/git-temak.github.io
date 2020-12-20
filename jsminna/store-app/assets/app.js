// get entries from DOM
const modalBody = document.querySelector('.modal-body');
const signupForm = document.getElementById('signup-form');
const fullname = document.getElementById('fullname');
const emailAdd = document.getElementById('email-add');
const phoneNo = document.getElementById('phone-no');
const address = document.getElementById('address');
const gender = document.getElementById('gender');
const password = document.getElementById('password');

// store url paths
const storeSignup = "https://jsminnastore.herokuapp.com/auth/signup";

// run when page has loaded
window.onload = () => {
	// Initialise AOS
	AOS.init({
		duration: 1000
    });

	// signup form - new user registration
	signupForm.onsubmit = () => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6ImhhcnJ5cG9ydGVyIDUiLCJpYXQiOjE2MDY0Nzk0MDUsImV4cCI6MTYwNjQ4MzAwNX0.V8j3bCZEMFiTa4yhpHdYP8uIesEU5ty6YzxNau2TKtE");
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify({
			"fullName":fullname.value,
			"email":emailAdd.value,
			"mobileNumber":phoneNo.value,
			"address":address.value,
			"gender":gender.value,
			"password":password.value
		});

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch(storeSignup, requestOptions)
		  .then(response => response.text())
		  .then(result => {
		  	signupForm.style.display = 'none';
		  	modalBody.innerHTML = `<h4 class="text-center text-success my-3">You have registered successfully!</h4>`
			console.log(result)
		  })
		  .catch(error => console.log('error', error));

	}
}