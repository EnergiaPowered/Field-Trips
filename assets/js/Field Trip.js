//	Declaring Input Fields
let name = document.getElementById('name'),
	email = document.getElementById('email'),
	phone = document.getElementById('phone'),
	facebook = document.getElementById('Facebook'),
	university = document.getElementById('university'),
	college = document.getElementById('college'),
	department = document.getElementById('department'),
	academic_year = document.getElementById('academic_year'),
	trips = document.getElementById('trip');
	message = document.getElementById('message');
//	Array Of Error Messages
let error_msg = document.getElementsByClassName('text-danger');
console.log(error_msg);
let submit = document.getElementById('submit');
let trips_data;
// regex for email and facebook account verification
const email_patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const facebook_patt = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;



//	Validating The Input Fields
// Display the error message which input has wrong data
function validate(){
	let stat = true;
	if(name.value == ""){
		error_msg[0].style.display = "block";
		stat = false;
	}else{
		error_msg[0].style.display = "none";
	}

	if(!email_patt.test(email.value)){
		error_msg[1].style.display = "block";
		stat = false;
	}else{
		error_msg[1].style.display = "none";
	}

	if(phone.value == "" || isNaN(phone.value) || phone.value.length != 11){
		error_msg[2].style.display = "block";
		stat = false
	}else{
		error_msg[2].style.display = "none";
	}
	if(!facebook_patt.test(facebook.value)){
		error_msg[3].style.display = "block";
		stat = false;
	}else{
		error_msg[3].style.display = "none";
	}

	if(department.value == ""){
		error_msg[4].style.display = "block";
		stat = false;
	}else{
		error_msg[4].style.display = "none";
	}
	if(academic_year.value == "" || isNaN(academic_year.value) || academic_year.value > 7 || academic_year.value < 0){
		error_msg[5].style.display = "block";
		stat = false;
	}else{
		error_msg[5].style.display = "none";
	}

	if(trips.value == ""){
		error_msg[6].style.display = "block";
		stat = false;
	}else{
		error_msg[6].style.display = "none";
	}

	return stat;
}


fetch("https://api.apispreadsheets.com/data/7632/").then(res=>{
	if (res.status === 200){
		// SUCCESS
		res.json().then(data=>{
			// the trips that available to choose 50 application for every trip
			// first 4 columns that have the Trip_Name and Count
			trips_data = data.data.slice(0, 4).filter(trip => trip.Counts < 50);
			//  upload from the spreadsheet trips which the user can choose
			trips_data.forEach(element => {
				let option = document.createElement("option");
				option.text = element.Trip_name;
				option.value = element.Trip_name;
				trips.appendChild(option);
			});
			// display the Reach-out message when there isn't available applications for all trips 
			if (trips_data.length == 0){
				let div = document.getElementById("intro");
				let form = document.getElementsByClassName('contact-clean')[0];
				form.style.display = "none";
				div.style.display = "block";
			}

			document.querySelector('.loader').classList.add('disappear');

		}).catch(err => alert("There was an error :(")	)
	}	
})





submit.addEventListener("click", function(e){
	e.preventDefault();
	// get selected trips in array then transform to comma seperated string
	console.log(trips.value )
	if(!validate()){
		console.log('error');
	}
	else{
		// post request by fetch to Api spreadSheet 
		fetch("https://api.apispreadsheets.com/data/7632/", {
		method: "POST",
		body: JSON.stringify({"data": {
		"Full name":name.value
		,"email":email.value
		,"phone number":phone.value
		,"Facebook account":facebook.value
		,"university": university.value
		,"college":college.value
		,"Department":department.value
		,"Academic Year":academic_year.value,
		"trips":trips.value , 
		"message":message.value}}),
	})	
		.then(res =>{
		// if created response will change to The success page
			if (res.status === 201){
				window.location.href="Submission.html";
			}
		else{
			alert("There was an error in the server :(")
			submit.innerText = "Submit";	
			submit.setAttribute("disabled", false);
		}
		});
		submit.setAttribute("disabled", true);
		submit.innerText = "Please wait...";



	}
});


