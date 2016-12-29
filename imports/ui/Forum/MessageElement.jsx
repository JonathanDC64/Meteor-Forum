import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { deepPurple500 } 	from 'material-ui/styles/colors';
export default class MessageElement extends Component{
	
	constructor(props){
		super(props);
	}
	
	render(){
		const msg = this.props.message;
		return(
			<Card
				expanded={true}
				expandable={true}
				initiallyExpanded={true}
			>
				<CardHeader
					style={{backgroundColor: deepPurple500}}
					title={msg.createdBy.username}
					subtitle={msg.createdOn.toLocaleDateString() + ' ' + msg.createdOn.toLocaleTimeString()}
					actAsExpander={true}
					showExpandableButton={true}
				/>
				
				<CardText 
					expandable={true}
					actAsExpander={true}
				>
					{msg.message}
				</CardText>
			</Card>
		)
	}
}

MessageElement.propTypes = {
	message: PropTypes.object.isRequired,
};