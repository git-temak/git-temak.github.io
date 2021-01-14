// get elements from DOM
const userImg = document.querySelector('.user-image');

// User API URL
const userApiUrl = "https://randomuser.me/api/?dataType=json&inc=gender,name,nat,location,email,registered,dob,phone,cell,picture&results=10";

const myHeaders = new Headers();
myHeaders.append("Cookie", "__cfduid=d2bfd4f935a3d5f16dbbb9d8803d8251d1610580376");

// run when page has loaded
window.onload = () => {
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	fetch(userApiUrl, requestOptions)
	    .then(response => response.text())
	    .then(result => {
  	  		const res = JSON.parse(result);
  	  		userImg.src = res.results[0].picture.large;
	    })
	    .catch(error => {
		  	alert(error);
	    });
}