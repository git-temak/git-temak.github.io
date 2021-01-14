// get elements from DOM
const cardContainer = document.querySelector('#right-content .container');

// User API URL
let noOfUsers = 2;
const userApiUrl = "https://randomuser.me/api/?dataType=json&inc=gender,name,nat,location,email,registered,dob,phone,cell,picture&results=";

const myHeaders = new Headers();

// run when page has loaded
window.onload = () => {
	const requestOptions = {
		method: 'GET',
		headers: myHeaders,
		redirect: 'follow'
	};

	// set how many users should be displayed based on the screen size
	if (window.innerWidth > '1024') {
		noOfUsers = 3;
	} if (window.innerWidth >= '1200') {
		noOfUsers = 2;
	} if (window.innerWidth > '1440') {
		noOfUsers = 4;
	} if (window.innerWidth > '2560') {
		noOfUsers = 5;
	}

	fetch(userApiUrl + noOfUsers, requestOptions)
	    .then(response => response.json())
	    .then(result => {
	    	const usersArray = result.results;
  	  		usersArray.forEach(user => {
	  	  		// create elements to be added to DOM
	  	  		const cardRow = document.createElement('div');
	  	  		const imgContainer = document.createElement('div');
	  	  		const userImg = document.createElement('img');
	  	  		const userDetails = document.createElement('div');
	  	  		const userName = document.createElement('h4');
	  	  		const userAddress = document.createElement('p');
	  	  		const userAddInfo = document.createElement('div');
	  	  		const userEmail = document.createElement('div');
	  	  		const userPhone = document.createElement('div');
	  	  		const userAddInfoArrow = document.createElement('div');

	  	  		// assign classes to newly created elements
	  	  		cardRow.classList.add('row', 'user-card', 'p-4', 'pt-5', 'mx-2', 'mb-4');
	  	  		imgContainer.classList.add('col-12', 'col-md-3', 'my-auto', 'pb-3', 'pb-md-0', 'text-center', 'text-md-left');
	  	  		userImg.classList.add('rounded-circle', 'user-image');
	  	  		userDetails.classList.add('col-12', 'col-md-9', 'px-0');
	  	  		userName.classList.add('user-name', 'lt-sp02', 'text-center', 'text-md-left');
	  	  		userAddress.classList.add('user-address', 'lt-sp02', 'mt-4');
	  	  		userAddInfo.classList.add('additional-info', 'd-flex', 'justify-content-between', 'align-items-center', 'flex-wrap');
	  	  		userEmail.classList.add('email', 'd-inline');
	  	  		userPhone.classList.add('phone', 'd-inline');
	  	  		userAddInfoArrow.classList.add('user-details-arrow', 'hover-st');

	  	  		//set content of the newly created elements
	  	  		userImg.src = user.picture.large;
	  	  		userName.innerText = user.name.first + ' ' + user.name.last;
	  	  		userAddress.innerText = user.location.street.number + ' ' + user.location.street.name + ', ' + user.location.city + ', ' + user.location.state;
	  	  		userEmail.innerHTML = `<i class="fa fa-envelope-o mr-2" aria-hidden="true"></i><span>${user.email}</span>`;
	  	  		userPhone.innerHTML = `<i class="fa fa-phone mr-2" aria-hidden="true"></i><span>${user.phone}</span>`;
	  	  		userAddInfoArrow.innerHTML = `<i class="fa fa-arrow-right" aria-hidden="true"></i>`;

	  	  		// append new elements to their appropriate parents
	  	  		cardContainer.appendChild(cardRow);
	  	  		cardRow.appendChild(imgContainer);
	  	  		imgContainer.appendChild(userImg);
	  	  		cardRow.appendChild(userDetails);
	  	  		userDetails.appendChild(userName);
	  	  		userDetails.appendChild(userAddress);
	  	  		userDetails.appendChild(userAddInfo);
	  	  		userAddInfo.appendChild(userEmail);
	  	  		userAddInfo.appendChild(userPhone);
	  	  		userAddInfo.appendChild(userAddInfoArrow);
  	  		})

  	  			// create row for footer buttons and add to DOM
  	  			const btnsRow = document.createElement('div');
	  	  		const dlnBtnDiv = document.createElement('div');
	  	  		const downloadBtn = document.createElement('button');
	  	  		const arrows = document.createElement('div');
	  	  		const leftArrow = document.createElement('div');
	  	  		const rightArrow = document.createElement('div');

	  	  		btnsRow.classList.add('row');
	  	  		dlnBtnDiv.classList.add('col-8', 'col-md-9');
	  	  		arrows.classList.add('col-4', 'col-md-3', 'd-flex', 'justify-content-between', 'align-items-center', 'arrows');
	  	  		downloadBtn.classList.add('download-btn', 'p-3');
	  	  		leftArrow.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mr-2', 'mr-md-0', 'm-md-auto');
	  	  		rightArrow.classList.add('d-flex', 'justify-content-center', 'align-items-center');

	  	  		downloadBtn.innerHTML = `<i class="fa fa-cloud-download mr-3" aria-hidden="true"></i>Download results`;
	  	  		leftArrow.innerHTML = `<i class="fa fa-chevron-left" aria-hidden="true"></i>`;
	  	  		rightArrow.innerHTML = `<i class="fa fa-chevron-right" aria-hidden="true"></i>`;

	  	  		cardContainer.appendChild(btnsRow);
	  	  		btnsRow.appendChild(dlnBtnDiv);
	  	  		btnsRow.appendChild(arrows);
	  	  		dlnBtnDiv.appendChild(downloadBtn);
	  	  		arrows.appendChild(leftArrow);
	  	  		arrows.appendChild(rightArrow);
	    })
	    .catch(error => {
		  	alert(error);
	    });
}