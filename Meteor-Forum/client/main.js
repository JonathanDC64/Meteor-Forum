import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute  } from 'react-router'

import App 		from '../imports/ui/App.jsx';
import TopicPage 	from '../imports/ui/Forum/TopicPage.jsx';
import Home 	from '../imports/ui/Forum/Home.jsx';


Meteor.startup(() => {
  render((
	  	<Router history={browserHistory}>
    		<Route path="/" component={App}>
	  			<IndexRoute component={Home}/>
	  			<Route path="/home" component={Home}/>
	  			<Route path="/topic/:topicId" component={TopicPage}/>
		  	</Route>
		</Router>
		 ), document.getElementById('render-target'));
});