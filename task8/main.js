const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const cpassword = document.getElementById("confirm-password");
const checkbox = document.getElementById("check");
const submit = document.getElementById("submit");

const nameFormat = /[0-9+]/g;

const namesFormat = (name) => {
	if (fname.value === "" || lname.value === "" || fname.value === "" && lname.value === "") {
		alert("Please enter your names")
		return false;
	} if (fname.value.match(nameFormat) || lname.value.match(nameFormat)) {
		alert("Please remove any number present in your name")
		return false
	} else {
		console.log('success');
	}
}

checkbox.addEventListener('click', namesFormat);

// submit.addEventListener("click", () => submit.removeAttribute("disabled") );