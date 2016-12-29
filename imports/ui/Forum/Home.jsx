import React, { Component, PropTypes } from 'react';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'


import CreateTopicDialog from './CreateTopicDialog.jsx';
import TopicElement from './TopicElement.jsx';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Topic } from '../../api/Forum/Topic.js';


export class Home extends Component{
	
	constructor(){
		super();
	}
	
	renderTopics(){
		
		const topics = this.props.topics;
		
		return topics.map((topic)=>{
			return(<TopicElement 
						key={topic._id}
						topicId={topic._id}
						title={topic.title}
						createdBy={topic.createdBy.username}
						createdOn={topic.createdOn.toLocaleDateString() + ' ' + topic.createdOn.toLocaleTimeString()}
						views={topic.views}
					/>)
		})
	}
	
	render(){
		return(
			<Row>
				<Col>
					
						<Row>
							<Col>
								{
									this.props.loggedIn 	?
									<CreateTopicDialog 
										callback={
											function(topicId){
												browserHistory.push('/topic/' + topicId)
											}.bind(this)
									}/> :''
								}
							</Col>
						</Row>
							
							
						
					<List>
						{this.renderTopics()}
					</List>
				</Col>
			</Row>
		)
	}
}

Home.propTypes = {
	topics: PropTypes.array,
	loggedIn: PropTypes.bool,
};

export default createContainer(()=>{
	Meteor.subscribe('topic');
	return{
		topics: Topic.find({},{sort:{createdOn: -1}}).fetch(),
		loggedIn: Meteor.userId() ? true : false,
	}
},Home);