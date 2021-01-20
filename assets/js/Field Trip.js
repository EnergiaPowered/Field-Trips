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

//	Array Of Error Messages
let error_msg = document.getElementsByClassName('text-danger');

//	Array Of Trips
let saved_data = document.getElementsByClassName('saved_data');

let submit = document.getElementById('submit');
const patt = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//	Selecting Multiple Trips
function multipleSelect(){
	for(let i = 0; i < trips.options.length; i++){
		if(trips.options[i].selected === true)
			saved_data[i].value = 1;
		else
			saved_data[i].value = 0;
	}
}

//	Validating The Input Fields
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
	
	multipleSelect();

	if(!validate()){
		console.log('error');
	}else{
		$.ajax({
        	url:'https://api.apispreadsheets.com/data/6910/',
       		type:'post',
       		data:$("#myForm").serializeArray(),
       		success: function(){
         		window.location.replace("Submission.html");
       		},
        	error: function(){
        		alert("There was an error :(")
      		}
  		});
	}
});