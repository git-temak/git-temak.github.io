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
	// signup form - new user registration
	signupForm.onsubmit = (e) => {
		e.preventDefault();
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
  	  		if (JSON.parse(result).success == false) {
		  	  	alert(JSON.parse(result).message);
		  		submit.innerText = 'Sign up';
			} else {
			  	signupForm.classList.add('d-none');
			  	successMsg.classList.remove('d-none');
	  	  		signupForm.reset();
			  	$('.success-message h4').text('You have registered successfully!');
			  	$('.success-message h4').addClass('text-success');
			  	//set the api key from login to session
			  	sessionStorage.setItem("User API Key", JSON.parse(result).payload.token);
			  	//show the form again after closing the modal
		  	  	$('#signupModal').on('hidden.bs.modal', () => {
		  	  		signupForm.classList.remove('d-none');
				  	successMsg.classList.add('d-none');
					submit.innerText = 'Sign up';
		  		});
			  }
			console.log(result);
		  })
		  .catch(error => {
		  	$('.success-message h4').removeClass('text-success');
		  	$('.success-message h4').addClass('text-danger');
		  	$('.success-message h4').innerText = error;
		  	alert(error);
		  	console.log('error', error);
		  });
	}

	// login form
	loginForm.onsubmit = (e) => {
		e.preventDefault();
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
			console.log(result);
			if (JSON.parse(result).success == false) {
			  	alert(JSON.parse(result).message);
				loginSubmit.innerText = 'Login';
			} else {
				loginForm.classList.add('d-none');
			  	loginSuccessMsg.classList.remove('d-none');
	  	  		loginForm.reset();
			  	$('.login-text-success').text('Login Successful!');
			  	$('.login-text-success').addClass('text-success');
			  	//set the api key from login to session
			  	sessionStorage.setItem("User API Key", JSON.parse(result).payload.token);
			  	if (window.location.href.indexOf("suggest") > -1){
				  	$('.login-success-message p').hide();
				  	setTimeout(() => {$('#loginModal').modal('hide')}, 1200);
			  	}
			}
		  })
		  .catch(error => {
		  	$('.login-text-success').addClass('text-danger');
		  	$('.login-text-success').text(error);
		  	console.log('error', error)
		  });
	}
	
	if (window.location.href.indexOf("suggest") > -1){
		// suggest form
		suggestForm.onsubmit = (e) => {
			e.preventDefault();
			suggestSubmit.innerHTML = `<i class="fa fa-spinner fa-spin mr-2"></i>Please Wait...`;
		  	//get the api key from session storage to be used for suggestion form validation
			const apiKey = sessionStorage.getItem("User API Key");

			const suggestHeaders = new Headers();
			suggestHeaders.append("Authorization", "Bearer " + apiKey);
			suggestHeaders.append("Content-Type", "application/json");

			let raw = JSON.stringify({
				"itemName":itemName.value,
				"itemDescription":itemDescription.value,
				"itemCategory":category.value,
				"reason":reason.value
			});

			const requestOptions = {
				method: 'POST',
				headers: suggestHeaders,
				body: raw,
				redirect: 'follow'
			};

			fetch(storeSuggest, requestOptions)
			  .then(response => response.text())
			  .then(result => {
				console.log(result);
				if (!$.isEmptyObject(JSON.parse(result).error)) {
				  	$('.suggest-body').html(`<p class="text-danger">${JSON.parse(result).error.name}: ${JSON.parse(result).error.message}</p>`);
				} else if (JSON.parse(result).success == false) {
				  	alert(JSON.parse(result).message);
					suggestSubmit.innerText = 'Submit suggestion';
				} else {
		  	  		suggestForm.reset();
				  	$('.suggest-body').html('<p class="text-success">Thank you! Your suggestion has been recorded successfully.</p>');
				  	setTimeout(() => {$('.suggest-body').html(suggestForm)}, 1500);
					suggestSubmit.innerText = 'Submit suggestion';
				}
			  })
			  .catch(error => {
			  	$('.suggest-body').html(`<p class="text-danger">${error}</p>`);
			  	console.log('error', error)
			  });
		}
	}
}