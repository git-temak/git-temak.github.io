// get entries from DOM
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const modalBody = document.querySelector('.modal-body');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const fullname = document.getElementById('fullname');
const emailAdd = document.getElementById('email-add');
const loginEmailAdd = document.getElementById('login-email-add');
const phoneNo = document.getElementById('phone-no');
const address = document.getElementById('address');
const gender = document.getElementById('gender');
const password = document.getElementById('password');
const loginPassword = document.getElementById('login-password');
const submit = document.getElementById('form-submit');
const loginSubmit = document.getElementById('login-submit');
const suggestSubmit = document.getElementById('suggest-submit');
const loaderIcon = document.querySelector(".fa-spin");
const successMsg = document.querySelector(".success-message");
const loginSuccessMsg = document.querySelector(".login-success-message");
const suggestForm = document.getElementById('suggest-form');
const itemName = document.getElementById('itemname');
const itemDescription = document.getElementById('itemdescription');
const category = document.getElementById('category');
const reason = document.getElementById('reason');

// store url paths
const storeSignup = "https://jsminnastore.herokuapp.com/auth/signup";
const storeLogin = "https://jsminnastore.herokuapp.com/auth/login/";
const storeSuggest = "https://jsminnastore.herokuapp.com/suggest";

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6ImhhcnJ5cG9ydGVyIDUiLCJpYXQiOjE2MDY0Nzk0MDUsImV4cCI6MTYwNjQ4MzAwNX0.V8j3bCZEMFiTa4yhpHdYP8uIesEU5ty6YzxNau2TKtE");
myHeaders.append("Content-Type", "application/json");

// run when page has loaded
window.onload = () => {
	// Initialise AOS
	if ( window.location.pathname === '/index.html' ){
		AOS.init({
			duration: 1000
	    });

		// signup form - new user registration
		signupForm.onsubmit = () => {
			submit.innerHTML = `<i class="fa fa-spinner fa-spin mr-2"></i>Please Wait...`;

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
			  	signupForm.classList.add('d-none');
			  	successMsg.classList.remove('d-none');
		  	  	$('#signupModal').on('hidden.bs.modal', () => {
		  	  		signupModal.reset();
		  		});
				console.log(result);
			  })
			  .catch(error => {
			  	$('.success-message h4').removeClass('text-success');
			  	$('.success-message h4').addClass('text-danger');
			  	$('.success-message h4').innerText = error;
			  	console.log('error', error)
			  });
		}

		// login form
		loginForm.onsubmit = () => {
			loginSubmit.innerHTML = `<i class="fa fa-spinner fa-spin mr-2"></i>Please Wait...`;

			let raw = JSON.stringify({
				"email":loginEmailAdd.value,
				"password":loginPassword.value
			});

			const requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
			};

			fetch(storeLogin, requestOptions)
			  .then(response => response.text())
			  .then(result => {
			  	loginForm.classList.add('d-none');
			  	loginSuccessMsg.classList.remove('d-none');
		  	  	$('#loginModal').on('hidden.bs.modal', () => {
		  	  		loginForm.reset();
		  		});
				console.log(result);
			  })
			  .catch(error => {
			  	$('.login-success-message h4').removeClass('text-success');
			  	$('.login-success-message h4').addClass('text-danger');
			  	$('.login-success-message h4').innerText = error;
			  	console.log('error', error)
			  });
		}
	}
	
	if (window.location.pathname === '/suggest.html' ){
		// suggest form
		suggestForm.onsubmit = () => {
			suggestSubmit.innerHTML = `<i class="fa fa-spinner fa-spin mr-2"></i>Please Wait...`;

			let raw = JSON.stringify({
				"itemName":itemName.value,
				"itemDescription":itemDescription.value,
				"itemCategory":category.value,
				"reason":reason.value
			});

			const requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
			};

			fetch(storeSuggest, requestOptions)
			  .then(response => response.text())
			  .then(result => {
			  	alert("Thank you!Your suggestion has been recorded successfully.")
	  	  		loginForm.reset();
				console.log(result);
			  })
			  .catch(error => console.log('error', error));
		}
	}
}