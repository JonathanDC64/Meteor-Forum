import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MessageElement from './MessageElement.jsx';

import { Message } from '../../api/Forum/Topic.js';

export class TopicPage extends Component{
	
	constructor(props){
		super(props);
		this.state={
			message: '',
			messageError: '',
		};
		Meteor.subscribe('message', this.props.params.topicId);
	}
	
	
	renderMessages(){
		const messages = this.props.messages;
		return messages.map((message)=>{
			return(<div><MessageElement key={message._id} message={message}/><br/></div>)
		});
	}
	
	handleSubmit(){
		var self = this;
		Meteor.call('message.insert', self.props.params.topicId, self.state.message, (error, result)=>{
			if(error){
				self.setState({messageError: error.reason});
			}
			else{
				self.setState({
					message: '',
					messageError: '',
				});
			}
		});
	}
	
	render(){
		return(
			<div>
				{
					this.props.loggedIn	?
					<div>
						<TextField
							fullWidth={true}
							hintText="Message"
							errorText={this.state.messageError}
							floatingLabelText="Message"
							multiLine={true}
							rows={5}
							onChange={(event)=>{this.setState({message: event.target.value})}}
							value={this.state.message}
						/>	
						<FlatButton label="Post" primary={true} disabled={!this.state.message ? true : false} onTouchTap={this.handleSubmit.bind(this)}/>
						<br />
						<br />
					</div>
					: ''
				}
				
				{this.renderMessages()}
			</div>
		)
	}
}


TopicPage.propTypes = {
	messages: PropTypes.array,
	loggedIn: PropTypes.bool,
};

export default createContainer(()=>{
	return{
		messages: Message.find({}).fetch(),
		loggedIn: Meteor.userId() ? true : false,
	}
},TopicPage);