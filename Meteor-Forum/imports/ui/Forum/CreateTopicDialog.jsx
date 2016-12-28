import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const initial_state = {
	title: '',
	message: '',
	error: '',
	open: false
}


export default class CreateTopicDialog extends Component{
	
	constructor(props){
		super(props);
		this.state = initial_state;
		
		Meteor.subscribe('topic');
		
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	resetState(){
		this.setState(initial_state);
	}
	
	handleOpen(){
    	this.setState({open: true});
	}
	
	handleClose(){
		this.setState({open: false});
	}
	
	handleSubmit(){
		var self = this;
		Meteor.call('topic.insert', this.state.title, this.state.message, (error, result)=>{
			if(error){
				self.setState({error: error.reason});
			}
			else{
				self.resetState();
				const topicId = result;
				self.props.callback(topicId);
			}
		});
		
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
				disabled={!this.state.title || !this.state.message}
			/>,
		];
		
		
		return(	
			<div>
				<RaisedButton label="Create Topic" primary={true} fullWidth={true} onTouchTap={this.handleOpen} />
				<Dialog
				  	title="Create Topic"
				  	actions={actions}
				  	modal={false}
				  	open={this.state.open}
				  	onRequestClose={this.handleClose}
					contentStyle={{width: '40%'}}
				>
					<TextField
						id="title"
						floatingLabelText="Title"
						hintText="Title"
						onChange={(event)=>{this.setState({title: event.target.value})}}
						fullWidth={true}
					/><br />
					<TextField
						id="message"
						floatingLabelText="Message"
						hintText="Message"
						onChange={(event)=>{this.setState({message: event.target.value})}}
						fullWidth={true}
						multiLine={true}
						rows={10}
					/><br />
					
					<div id="topic_create_error" style={{color: '#F44336'}}>
						{this.state.error}
					</div>
				</Dialog>
			</div>
		)
	}
}