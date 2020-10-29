let checkValidation = setInterval(main, 5000);

const form = document.getElementById("signup-form");

function main() {
	// get all input fields
	const fname = document.getElementById("fname");
	const lname = document.getElementById("lname");
	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const cpassword = document.getElementById("confirm-password");
	const checkbox = document.getElementById("check");
	const btnSubmit = document.getElementById("btn-submit");

	// get all error elements
	const fnameError = document.querySelector(".e-fname");
	const lnameError = document.querySelector(".e-lname");
	const emailError = document.querySelector(".e-email");
	const passError = document.querySelector(".e-password");
	const cpassError = document.querySelector(".e-cpassword");

	// regex check for names and email
	const nameMatch = /[0-9+]/g;
	const emailMatch = /^[a-z0-9.!#$%&'"*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;


	// validations
	const namesFormat = () => {
		if (fname.value === "" && lname.value === "") {
			fnameError.innerHTML = "Please enter your first name";
			document.form.fname.focus();
			return false;
		} if (fname.value === "") {
			fnameError.innerHTML = "Please enter your first name";
			document.form.fname.focus();
			return false;
		} if (fname.value.match(nameMatch)) {
			fnameError.innerHTML = "Please remove any number present in your name";
			document.form.fname.focus();
			return false;
		} else {
			fnameError.innerHTML = "";
			if (lname.value === "") {
				lnameError.innerHTML = "Please enter your last name";
				document.form.lname.focus();
				return false;
			} if (lname.value.match(nameMatch)) {
				lnameError.innerHTML = "Please remove any number present in your name";
				document.form.lname.focus();
				return false;
			} else {
				fnameError.innerHTML = "";
				lnameError.innerHTML = "";
				return true;
			}
		}
	}

	const emailFormat = () => {
		if (email.value === "") {
			emailError.innerHTML = "Please enter your email address";
			document.form.email.focus();
			return false;
		} if (email.value.match(emailMatch)) {
			emailError.innerHTML = "";
			return true;
		} else {
			emailError.innerHTML = "Please ensure your email is valid";
			document.form.email.focus();
			return false;
		}
	}

	const passMatch = () => {
		if (password.value === "" && cpassword.value === "") {
			passError.innerHTML = "Please type in your password";
			document.form.password.focus();
			return false;
		} if (password.value === "") {
			passError.innerHTML = "Please type in your password";
			document.form.password.focus();
			return false;
		} if (password.value.length < 8) {
			passError.innerHTML = "Password should be at least 8 characters long";
			document.form.password.focus();
			return false;
		} else {
			passError.innerHTML = "";
			if (cpassword.value === "") {
				cpassError.innerHTML = "Please type in your password again";
				document.form.cpassword.focus();
				return false;
			} if (cpassword.value.length < 8) {
				cpassError.innerHTML = "Password does not match";
				document.form.cpassword.focus();
				return false;
			} if (password.value !== cpassword.value) {
				passError.innerHTML = "Passwords do not match";
				cpassError.innerHTML = "Passwords do not match";
				document.form.cpassword.focus()
				return false;
			} else {
				passError.innerHTML = "";
				cpassError.innerHTML = "";
				return true;
			}
		}
	}

	const tosCheck = () => !checkbox.checked ? alert("Kindly accept terms and conditions") : true;

	const formValidation = () => {
		if (namesFormat() && emailFormat() && passMatch() && tosCheck()) {
			btnSubmit.removeAttribute("disabled");
			btnSubmit.classList.add("btn-hover");
		}
	}

	formValidation();
}

const loaderIcon = document.querySelector(".fa-spin");

form.addEventListener('submit', function(e){
	e.preventDefault();
	loaderIcon.classList.remove("dnone");
	setTimeout(function(){loaderIcon.classList.add("dnone");form.submit();}, 2000);
});