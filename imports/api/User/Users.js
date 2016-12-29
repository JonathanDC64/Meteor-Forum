import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { AccountsServer } from 'meteor/accounts-base';
import { UsersErrors } from './UsersErrors.js';


export const Users = Meteor.users;


if(Meteor.isServer){
	Meteor.publish('users', ()=>{
		return Users.find();
	});
	
	Accounts.validateLoginAttempt((attempt)=>{
		 return attempt.allowed
	});
}


const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MAX_LENGTH = 40;
const EMAIL_MAX_LENGTH = 50;

Meteor.methods({
	'users.insert'(username, password, email){
		check(username, String);
		check(password, String);
		check(email, String);
		
		if(!username || username.length > USERNAME_MAX_LENGTH){
			throw new Meteor.Error(UsersErrors.username_length,'Username exceeds maximum length of ' + USERNAME_MAX_LENGTH + '.');
		}
		
		if(!password || password.length > PASSWORD_MAX_LENGTH){
			throw new Meteor.Error(UsersErrors.password_length,'Password exceeds maximum length of ' + PASSWORD_MAX_LENGTH + '.');
		}
		
		if(!email || email.length > EMAIL_MAX_LENGTH){
			throw new Meteor.Error(UsersErrors.email_length,'Email exceeds maximum length of ' + EMAIL_MAX_LENGTH + '.');
		}
		
		const us = username;
		const pw = password;
		const em = email;
		
		
		Accounts.createUser({
			username: us,
			password: pw,
			email: em
		});
	},
});