import React, { Component, PropTypes } from 'react';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import {ListItem} from 'material-ui/List';
import { IndexLink } from 'react-router'

export default class TopicElement extends Component{
	
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<IndexLink to={'/topic/' + this.props.topicId}>
				<ListItem
					rightIcon={<CommunicationMessage >Views: {this.props.views}</CommunicationMessage>}
					primaryText={this.props.title}
					secondaryText={
						'Created on ' + this.props.createdOn 	+
						'\nby ' + this.props.createdBy			+
						''	
					}
				/>
			</IndexLink>
		)
	}
}

TopicElement.propTypes = {
	topicId: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	createdBy: PropTypes.string.isRequired,
	createdOn: PropTypes.string.isRequired,
	views: PropTypes.number.isRequired,
};