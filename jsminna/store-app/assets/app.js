// get elements from DOM
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

const table = document.getElementById("suggestions-table");
const tableBody = document.getElementById("table-body");
const search = document.getElementById("search");
const spinner = document.getElementById("spinner");

// store url paths
const storeSignup = "https://jsminnastore.herokuapp.com/auth/signup";
const storeLogin = "https://jsminnastore.herokuapp.com/auth/login/";
const storeSuggest = "https://jsminnastore.herokuapp.com/suggest";
const storeSuggested = "https://jsminnastore.herokuapp.com/suggested";
const storeElectronics = "https://jsminnastore.herokuapp.com/suggested/electronics";
const storeFurniture = "https://jsminnastore.herokuapp.com/suggested/furniture";
const storeGrocery = "https://jsminnastore.herokuapp.com/suggested/grocery";

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
				  	localStorage.setItem("User API Key", JSON.parse(result).payload.token);
				  	//show the form again after closing the modal
			  	  	$('#signupModal').on('hidden.bs.modal', () => {
			  	  		signupForm.classList.remove('d-none');
					  	successMsg.classList.add('d-none');
						submit.innerText = 'Sign up';
			  		});
				  }
		    })
		    .catch(error => {
			  	$('.success-message h4').removeClass('text-success');
			  	$('.success-message h4').addClass('text-danger');
			  	$('.success-message h4').innerText = error;
			  	alert(error);
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
				  	localStorage.setItem("User API Key", JSON.parse(result).payload.token);
				  	if (window.location.href.indexOf("suggest") > -1){
					  	$('.login-success-message p').hide();
					  	setTimeout(() => {$('#loginModal').modal('hide')}, 1200);
				  	}
				}
			})
		    .catch(error => {
		  		$('.login-text-success').addClass('text-danger');
		  		$('.login-text-success').text(error);
		    });
	}
	
	// fire on the suggest page
	if (window.location.href.search(/\bsuggest\b/i) > -1){
	  	//get the api key from session storage to be used for suggestion form validation
		const apiKey = localStorage.getItem("User API Key");

		//check if api key is set
		if (!apiKey) {
			$('.suggest-header').html('<p class="mt-5 text-center text-danger">You do not have authorization to view the content of this page.</p><p class="font-italic text-center font-s16"><span class="font-weight-bold">Please note: </span>You need to <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> to use this feature. Then refresh this page to try again.</p>');
		} else {
	    	suggestForm.removeAttribute('hidden');

	    	// suggest form
	    	suggestForm.onsubmit = (e) => {
	    		e.preventDefault();
	    		suggestSubmit.innerHTML = `<i class="fa fa-spinner fa-spin mr-2"></i>Please Wait...`;

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
				    });
			}
		}
	}

	// fire on the suggestions list page
	if (window.location.href.search(/\bsuggested.html\b/i) > -1){
		//get the api key from session storage to be used for suggestion form validation
		const apiKey = localStorage.getItem("User API Key");

		//check if api key is set
		if (!apiKey) {
			$('.page-message').html('<p class="mt-5 text-center text-danger">You do not have authorization to view the content of this page.</p><p class="font-italic text-center font-s16"><span class="font-weight-bold">Please note: </span>You need to <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> to use this feature. Then refresh this page to try again.</p>');
		} else {
			spinner.removeAttribute('hidden');
			
			const suggestHeaders = new Headers();
			suggestHeaders.append("Authorization", "Bearer " + apiKey);
			suggestHeaders.append("Content-Type", "application/json");

			const requestOptions = {
				method: 'GET',
				headers: suggestHeaders,
				redirect: 'follow'
			};

			fetch(storeSuggested, requestOptions)
				.then(response => response.text())
				.then(result => {
					if (!$.isEmptyObject(JSON.parse(result).error)) {
					  	$('.page-message').html(`<p class="text-danger text-center">${JSON.parse(result).error.name}: ${JSON.parse(result).error.message}</p>
					  		<p class="font-italic text-center font-s16">Kindly <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> again to use this feature.</p>`);
						spinner.setAttribute('hidden', '')
					} else {
						search.removeAttribute('hidden');

						JSON.parse(result).payload.result.forEach(entry => {
						const row = tableBody.insertRow(0);
						const cell1 = row.insertCell(0);
						const cell2 = row.insertCell(1);
						const cell3 = row.insertCell(2);
						const cell4 = row.insertCell(3);

						cell1.innerHTML = entry.itemName
						cell2.innerHTML = entry.itemDescription;
						if (entry.itemCategory === 'electronics') {
							cell3.innerHTML = `<a href="suggested/electronics.html">${entry.itemCategory}</a>`;
						} else if (entry.itemCategory === 'furniture') {
							cell3.innerHTML = `<a href="suggested/furniture.html">${entry.itemCategory}</a>`;
						} else if (entry.itemCategory === 'grocery') {
							cell3.innerHTML = `<a href="suggested/grocery.html">${entry.itemCategory}</a>`;
						}
						cell4.innerHTML = entry.reason;

						setTimeout(() => {
							spinner.setAttribute('hidden', '')
							table.removeAttribute('hidden', '')
						}, 1000);
						});
					}
				})
				.catch(error => alert('error', error))
		}

		const searchItems = () => {
			filter = search.value.toUpperCase();
			tr = tableBody.getElementsByTagName("tr");

			for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
					txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
			    }
			}
		}

		search.onkeyup = searchItems;
	}

	// fire on the electronics list page
	if (window.location.href.search(/\belectronics\b/i) > -1){
		//get the api key from session storage to be used for suggestion form validation
		const apiKey = localStorage.getItem("User API Key");

		//check if api key is set
		if (!apiKey) {
			$('.page-message').html('<p class="mt-5 text-center text-danger">You do not have authorization to view the content of this page.</p><p class="font-italic text-center font-s16"><span class="font-weight-bold">Please note: </span>You need to <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> to use this feature. Then refresh this page to try again.</p>');
		} else {
			spinner.removeAttribute('hidden');
			
			const suggestHeaders = new Headers();
			suggestHeaders.append("Authorization", "Bearer " + apiKey);
			suggestHeaders.append("Content-Type", "application/json");

			const requestOptions = {
				method: 'GET',
				headers: suggestHeaders,
				redirect: 'follow'
			};

			fetch(storeElectronics, requestOptions)
				.then(response => response.text())
				.then(result => {
					if (!$.isEmptyObject(JSON.parse(result).error)) {
					  	$('.page-message').html(`<p class="text-danger text-center">${JSON.parse(result).error.name}: ${JSON.parse(result).error.message}</p>
					  		<p class="font-italic text-center font-s16">Kindly <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> again to use this feature.</p>`);
						spinner.setAttribute('hidden', '')
					} else {
						search.removeAttribute('hidden');

						JSON.parse(result).payload.result.forEach(entry => {
						const row = tableBody.insertRow(0);
						const cell1 = row.insertCell(0);
						const cell2 = row.insertCell(1);
						const cell3 = row.insertCell(2);

						cell1.innerHTML = entry.itemName
						cell2.innerHTML = entry.itemDescription;
						cell3.innerHTML = entry.reason;

						setTimeout(() => {
							spinner.setAttribute('hidden', '')
							table.removeAttribute('hidden', '')
						}, 1000);
						});
					}
				})
				.catch(error => alert('error', error))
		}

		const searchItems = () => {
			filter = search.value.toUpperCase();
			tr = tableBody.getElementsByTagName("tr");

			for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
					txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
			    }
			}
		}

		search.onkeyup = searchItems;
	}

	// fire on the furniture list page
	if (window.location.href.search(/\bfurniture\b/i) > -1){
		//get the api key from session storage to be used for suggestion form validation
		const apiKey = localStorage.getItem("User API Key");

		//check if api key is set
		if (!apiKey) {
			$('.page-message').html('<p class="mt-5 text-center text-danger">You do not have authorization to view the content of this page.</p><p class="font-italic text-center font-s16"><span class="font-weight-bold">Please note: </span>You need to <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> to use this feature. Then refresh this page to try again.</p>');
		} else {
			spinner.removeAttribute('hidden');
			
			const suggestHeaders = new Headers();
			suggestHeaders.append("Authorization", "Bearer " + apiKey);
			suggestHeaders.append("Content-Type", "application/json");

			const requestOptions = {
				method: 'GET',
				headers: suggestHeaders,
				redirect: 'follow'
			};

			fetch(storeFurniture, requestOptions)
				.then(response => response.text())
				.then(result => {
					if (!$.isEmptyObject(JSON.parse(result).error)) {
					  	$('.page-message').html(`<p class="text-danger text-center">${JSON.parse(result).error.name}: ${JSON.parse(result).error.message}</p>
					  		<p class="font-italic text-center font-s16">Kindly <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> again to use this feature.</p>`);
						spinner.setAttribute('hidden', '')
					} else {
						search.removeAttribute('hidden');

						JSON.parse(result).payload.result.forEach(entry => {
						const row = tableBody.insertRow(0);
						const cell1 = row.insertCell(0);
						const cell2 = row.insertCell(1);
						const cell3 = row.insertCell(2);

						cell1.innerHTML = entry.itemName
						cell2.innerHTML = entry.itemDescription;
						cell3.innerHTML = entry.reason;

						setTimeout(() => {
							spinner.setAttribute('hidden', '')
							table.removeAttribute('hidden', '')
						}, 1000);
						});
					}
				})
				.catch(error => alert('error', error))
		}

		const searchItems = () => {
			filter = search.value.toUpperCase();
			tr = tableBody.getElementsByTagName("tr");

			for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
					txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
			    }
			}
		}

		search.onkeyup = searchItems;
	}

	// fire on the grocery list page
	if (window.location.href.search(/\bgrocery\b/i) > -1){
		//get the api key from session storage to be used for suggestion form validation
		const apiKey = localStorage.getItem("User API Key");

		//check if api key is set
		if (!apiKey) {
			$('.page-message').html('<p class="mt-5 text-center text-danger">You do not have authorization to view the content of this page.</p><p class="font-italic text-center font-s16"><span class="font-weight-bold">Please note: </span>You need to <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> to use this feature. Then refresh this page to try again.</p>');
		} else {
			spinner.removeAttribute('hidden');
			
			const suggestHeaders = new Headers();
			suggestHeaders.append("Authorization", "Bearer " + apiKey);
			suggestHeaders.append("Content-Type", "application/json");

			const requestOptions = {
				method: 'GET',
				headers: suggestHeaders,
				redirect: 'follow'
			};

			fetch(storeGrocery, requestOptions)
				.then(response => response.text())
				.then(result => {
					if (!$.isEmptyObject(JSON.parse(result).error)) {
					  	$('.page-message').html(`<p class="text-danger text-center">${JSON.parse(result).error.name}: ${JSON.parse(result).error.message}</p>
					  		<p class="font-italic text-center font-s16">Kindly <a data-toggle="modal" data-target="#loginModal" href>Login</a> or <a data-toggle="modal" data-target="#signupModal" href>Sign up</a> again to use this feature.</p>`);
						spinner.setAttribute('hidden', '')
					} else {
						search.removeAttribute('hidden');

						JSON.parse(result).payload.result.forEach(entry => {
						const row = tableBody.insertRow(0);
						const cell1 = row.insertCell(0);
						const cell2 = row.insertCell(1);
						const cell3 = row.insertCell(2);

						cell1.innerHTML = entry.itemName
						cell2.innerHTML = entry.itemDescription;
						cell3.innerHTML = entry.reason;

						setTimeout(() => {
							spinner.setAttribute('hidden', '')
							table.removeAttribute('hidden', '')
						}, 1000);
						});
					}
				})
				.catch(error => alert('error', error))
		}

		const searchItems = () => {
			filter = search.value.toUpperCase();
			tr = tableBody.getElementsByTagName("tr");

			for (i = 0; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[0];
			    if (td) {
					txtValue = td.textContent || td.innerText;
					if (txtValue.toUpperCase().indexOf(filter) > -1) {
						tr[i].style.display = "";
					} else {
						tr[i].style.display = "none";
					}
			    }
			}
		}

		search.onkeyup = searchItems;
	}
}