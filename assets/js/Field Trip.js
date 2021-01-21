//	Declaring Input Fields
let name = document.getElementById('name'),
	email = document.getElementById('email'),
	phone = document.getElementById('phone'),
	facebook = document.getElementById('Facebook'),
	university = document.getElementById('university'),
	college = document.getElementById('college'),
	department = document.getElementById('department'),
	academic_year = document.getElementById('academic_year'),
	last_GPA = document.getElementById('last_GPA'),
	trips = document.getElementById('trip');
	message = document.getElementById('message');
//	Array Of Error Messages
let error_msg = document.getElementsByClassName('text-danger');

let submit = document.getElementById('submit');
// regex for email verification
const patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Selecting Multiple Trips
function get_selected_values(select){
	let selected = []
	let options = select && select.options;
	console.log(options)
	for (let i=0; i < 4 ; i++) {
		if (options[i].selected) {
			selected.push(options[i].value || options[i].text);
		}
	}	
	return selected;
};

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

	if(!patt.test(email.value)){
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

	if(facebook.value == ""){
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

	if(last_GPA.value == "" || isNaN(last_GPA.value) || last_GPA.value > 5 || last_GPA.value < 0){
		error_msg[6].style.display = "block";
		stat = false;
	}else{
		error_msg[6].style.display = "none";
	}

	if(trips.value == ""){
		error_msg[7].style.display = "block";
		stat = false;
	}else{
		error_msg[7].style.display = "none";
	}

	return stat;
}

submit.addEventListener("click", function(e){
	e.preventDefault();
	// get selected trips in array then transform to comma seperated string
	selected_trips = get_selected_values(trips).join();

	if(!validate()){
		console.log('error');
	}
	else{
		// post request by fetch to Api spreadSheet 
		fetch("https://api.apispreadsheets.com/data/6960/", {
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
		"Last GPA":last_GPA.value,
		"trips":selected_trips, 
		"message":message.value}}),
		})
		.then(res =>{
		// if created response will change to The success page
			if (res.status === 201){
				window.location.replace("Submission.html");
			}
		else{
			alert("There was an error :(")	
		}
		})

	}
});