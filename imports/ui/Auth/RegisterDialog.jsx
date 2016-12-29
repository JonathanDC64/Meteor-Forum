import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { UsersErrors } from '../../api/User/UsersErrors.js';

export default class RegisterDialog extends Component{
	
	constructor(){
		super();
		this.state = {
			open : false,
			username: '',
			password: '',
			email: '',
			usernameError: '',
			passwordError: '',
			emailError:''
		};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		
		Meteor.subscribe('users');
	}
	

	
	handleOpen()
	{
    	this.setState({open: true});
	}

	handleClose(){
		this.setState({open: false});
	}
	
	handleSubmit(){
		const us = this.state.username;
		const pw = this.state.password;
		const em = this.state.email;
		
		
		Meteor.call('users.insert', us, pw, em, function(error, result){
			if(error){
				console.log(error);
				const err = error.error;
				const reason = error.reason;
				if(err === UsersErrors.username_length || err === UsersErrors.username_exists){
					this.setState({usernameError: reason});
				}
			}
			else{
				this.handleClose();
				this.props.callback(us);
			}
			
		}.bind(this));
		
		
	}
	
	render(){
		const actions = [
			  <FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			  />,
			  <FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleSubmit}
			  />,
		];
		return(
			<div>
				<RaisedButton label="Register" primary={true} onTouchTap={this.handleOpen} />
				<Dialog
				  	title="Register"
				  	actions={actions}
				  	modal={false}
				  	open={this.state.open}
				  	onRequestClose={this.handleClose}
					contentStyle={{width: '40%'}}
				>
					<TextField
						id="username"
						floatingLabelText="Username"
						hintText="Username"
						errorText={this.state.usernameError}
						onChange={(event)=>{this.setState({username: event.target.value})}}
					/><br />
					<TextField
						id="password"
						type="password"
						floatingLabelText="Password"
						hintText="Password"
						errorText={this.state.passwordError}
						onChange={(event)=>{this.setState({password: event.target.value})}}
					/><br />
					<TextField
						id="email"
						type="email"
						floatingLabelText="Email"
						hintText="Email"
						errorText={this.state.emailError}
						onChange={(event)=>{this.setState({email: event.target.value})}}
					/>
					<br />
				</Dialog>
			</div>
		)
	}
}