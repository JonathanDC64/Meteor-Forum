import React, { Component } from 'react';
import Header from './Header.jsx';
import { Link } from 'react-router';
import { Container, Row, Col, Visible, Hidden } from 'react-grid-system';
import Paper from 'material-ui/Paper';

export default class MainContent extends Component{
	render(){
		return(
			<div>
				<Header />	
				<Row style={{marginTop: '10px'}}>
					<Col sm={0} md={2} lg={2}></Col>
					<Col sm={12} md={8} md={8}>{this.props.content}</Col>
					<Col sm={0} md={2} lg={2}></Col>
				</Row>
			</div>	
		)
	}
}