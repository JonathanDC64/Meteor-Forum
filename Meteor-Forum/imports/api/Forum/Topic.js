import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Users } from '../User/Users.js';


export const Topic = new Mongo.Collection('topic');
export const Message = new Mongo.Collection('message');

if(Meteor.isServer){
	Meteor.publish('topic',()=>{
		return Topic.find();
	});
	Meteor.publish('message',(topicId)=>{ 
		return Message.find({topicId: topicId});;
	});
}

const TOPIC_TITLE_MAX_LENGTH = 100;
const TOPIC_MESSAGE_MAX_LENGTH = 5000;


function createTopic(title){
	return {
		title: title,
		createdOn: new Date(),
		createdBy: createdBy(Meteor.userId()),
		views: 0
	}
}

function createMessage(topicId,message){
	return {
		topicId: topicId,
		message: message,
		createdOn: new Date(),
		createdBy: createdBy(Meteor.userId()),
	}
}

function createdBy(userId){
	return{
		_id: userId, 
		username: Users.find({_id: userId}).fetch()[0].username
	}
}


function validateTopic(title, message){
	validateTitle(title);
	
	validateMessage(message);
}

function validateTitle(title){
	if(!title){
		throw new Meteor.Error('topic_title_empty', 'The title of the topic is empty');
	}

	if(title.length > TOPIC_TITLE_MAX_LENGTH){
		throw new Meteor.Error('topic_title_length', 'The length of the title exceeds the maximum of ' + TOPIC_TITLE_MAX_LENGTH + ' characters.');
	}
}

function validateMessage(message){
	if(!message){
		throw new Meteor.Error('topic_message_empty', 'The message of the topic is empty');
	}

	if(message.length > TOPIC_MESSAGE_MAX_LENGTH){
		throw new Meteor.Error('topic_message_length', 'The length of the message exceeds the maximum of ' + TOPIC_MESSAGE_MAX_LENGTH + ' characters.');
	}
}




Meteor.methods({
	'topic.insert'(title, message){
		check(title, String);
		check(message, String);
		
		if(Meteor.userId()){
			validateTopic(title,message);
			
			var currentTopic = createTopic(title)
			
			var tid = Topic.insert(currentTopic, (err,result)=>{
				if(!err){
					const id = result;
					Message.insert(createMessage(id,message));
				}
			});
			
			if(tid)
				return tid;
		}
	},
	'topic.list'(){
		
		let topics = Topic.find({},{ sort: { createdOn : -1 }}).fetch();
		
		topics.forEach((topic)=>{
			const id = topic.createdBy;
			const username = Users.find({_id: id}).fetch()[0].username;
			topic.username = username;
		});
		return topics;
	},
	'topic.messages'(topicId){
		const messages = Message.find({topicId: topicId}).fetch();
		
		messages.forEach((message)=>{
			const id = message.createdBy;
			const username = Users.find({_id: id}).fetch()[0].username;
			message.username = username;
		});
		
		return messages;
	},
	'message.insert'(topicId,message){
		check(message, String);
		if(Meteor.userId()){
			validateMessage(message);
			Message.insert(createMessage(topicId,message));
		}
	},
});