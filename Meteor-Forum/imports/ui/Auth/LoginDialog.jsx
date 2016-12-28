import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import RegisterDialog from './RegisterDialog.jsx';


export default class LoginDialog extends Component{
	constructor(){
		super();
		this.state = {
			open : false,
			username: '',
			password: '',
			registered: false,
			error: ''
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
		
		Meteor.loginWithPassword(us, pw, function(error){
			if(!error){
				this.handleClose();
			}
			else{
				this.setState({error: 'Invalid login. Please try again.'});
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
				disabled={!this.state.username || !this.state.password}
			/>,
		];
		return(
			<div>
				<RaisedButton label="Login" primary={true} onTouchTap={this.handleOpen} />
				<Dialog
				  	title="Login"
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
						value={this.state.username}
					/><br />
					<TextField
						id="password"
						type="password"
						floatingLabelText="Password"
						hintText="Password"
						errorText={this.state.passwordError}
						onChange={(event)=>{this.setState({password: event.target.value})}}
					/><br />
					<RegisterDialog callback={
							function(us){
								this.setState({username: us, registered: true});
							}.bind(this)
						}/>
					<br />
					
					<div id="login_error" style={{color: '#F44336'}}>
						{this.state.error}
					</div>
				</Dialog>
				{
					/*
				<Snackbar
				  open={this.state.registered}
				  message="Registration Successful!"
				  autoHideDuration={10000}
				/>*/
				}
			</div>
		)
	}
}