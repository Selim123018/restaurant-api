const validator=require('validator');
const isEmpty = require('./is-empty');

module.exports=function validateRegisterInput(data){
	let errors={};

	data.name=!isEmpty(data.name)? data.name:'';
	data.email=!isEmpty(data.email)? data.email:'';
	data.password=!isEmpty(data.password)? data.password:'';
	data.cpassword=!isEmpty(data.cpassword)? data.cpassword:'';

	if(!validator.isLength(data.name, { min:2, max:30})){
		errors.name='Name must be between 2 and 30 characters';
	}
	if(validator.isEmpty(data.name)){
		errors.name='Name is required';
	}
	
	if(!validator.isEmail(data.email)){
		errors.email='Email is invalid';
	}
	if(validator.isEmpty(data.email)){
		errors.email='Email is required';
	}
	if(validator.isEmpty(data.password)){
		errors.password='Password is required';
	}
	if(!validator.isLength(data.password, {min:5, max:20})){
		errors.password='Password must be at least 5 charaters';
	}
	if(validator.isEmpty(data.cpassword)){
		errors.cpassword='Confirm password is required';
	}
	if(!validator.equals(data.password, data.cpassword)){
		errors.cpassword='password is not match';
	}


	return {
		errors,
		isValid:isEmpty(errors)
	}
}