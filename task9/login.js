const menuToggle = () => {
    const navs = document.querySelectorAll('.navbarItems');
    navs.forEach(nav => nav.classList.toggle('navbarToggleShow'));
}
  
document.querySelector('.navbarToggle').addEventListener('click', menuToggle);

let checkValidation = setInterval(main, 3000);

const form = document.getElementById("login-form");

function main() {
	// get all input fields
	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const btnSubmit = document.getElementById("btn-submit");

	// get all error elements
	const emailError = document.querySelector(".e-email");
	const passError = document.querySelector(".e-password");

	// regex check for email
	const emailMatch = /^[a-z0-9.!#$%&'"*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/i;

	// validations
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
		if (password.value === "") {
			passError.innerHTML = "Please type in your password";
			document.form.password.focus();
			return false;
		} else {
			passError.innerHTML = "";
			return true;
		}
	}

	const loginFormValidation = () => {
		if (emailFormat() && passMatch()) {
			btnSubmit.removeAttribute("disabled");
			btnSubmit.classList.add("btn-hover");
			return true;
		} else return false;
	}

	loginFormValidation();
}