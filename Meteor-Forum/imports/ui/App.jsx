import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  	cyan500, cyan700,
  	pinkA200,
	deepPurple500,
  	grey100, grey300, grey400, grey500,
  	white, darkBlack, fullBlack,
	grey600,
	pinkA100, pinkA400,
	fullWhite,
} 	from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

import RaisedButton from 'material-ui/RaisedButton';
import MainContent from './MainContent.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: deepPurple500,
		primary2Color: cyan700,
		primary3Color: grey600,
		accent1Color: pinkA200,
		accent2Color: pinkA400,
		accent3Color: pinkA100,
		textColor: fullWhite,
		secondaryTextColor: fade(fullWhite, 0.7),
		alternateTextColor: white,
		canvasColor: '#303030',
		borderColor: fade(fullWhite, 0.3),
		disabledColor: fade(fullWhite, 0.3),
		pickerHeaderColor: fade(fullWhite, 0.12),
		clockCircleColor: fade(fullWhite, 0.12)
	}
});



// App component - represents the whole app
export default class App extends Component {
  render() {
	  return ( 
		<MuiThemeProvider muiTheme={muiTheme}>
			<MainContent content={this.props.children}/>
		</MuiThemeProvider>
    );
  }
}