import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import CommonConstants from '../constants/CommonConstants.jsx';
import LoginDialog from './Auth/LoginDialog.jsx'

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';


export class Header extends Component{
	constructor(props) {
		super(props);
		
		this.state = {
			open: false
		};
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}
	
	handleMenuClick(){
		this.setState({
			open: !this.state.open
		});
	}
	
	
	render(){
		return(
			<div>
				<AppBar
					title={CommonConstants.SITE_NAME}
					iconElementRight={
						<div>	
							{
								!this.props.loggedIn 	?
								<LoginDialog />			:
								<RaisedButton 
									label="Logout" 
									primary={true} 
									onTouchTap={()=>{
											Meteor.logout((error)=>{
											});
										}
									} 
								/>
							}
						</div>		
					}
					onLeftIconButtonTouchTap={this.handleMenuClick}
				>
				</AppBar>	
				<Drawer 
					open={this.state.open} 
					docked={false}
					onRequestChange={(open) => this.setState({open})}
				>
					<MenuItem>React &gt; Angular</MenuItem>
				</Drawer>
			</div>
		)
	}
}



Header.propTypes = {
	loggedIn: PropTypes.bool,
};

export default createContainer(()=>{
	return{
		loggedIn: Meteor.userId() ? true : false,
	}
},Header);