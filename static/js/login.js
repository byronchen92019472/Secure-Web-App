window.onload = init;

function init(){
	var form_submit = document.getElementById("submit");
	if (form_submit){
		form_submit.onclick = check_form;
	}
}

function check_form(){
	username_input = document.getElementById("username");
	password_input = document.getElementById("password");
	
	username_input.value == "" ? username_input.style.border = "1px solid red": username_input.style.border = "1px solid black";
	password_input.value == "" ? password_input.style.border = "1px solid red": password_input.style.border = "1px solid black";

	return username_input.value != "" && password_input.value != "";
}