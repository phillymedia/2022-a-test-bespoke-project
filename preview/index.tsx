import React from 'react';
import ReactDOM from 'react-dom';

import AppBar from './AppBar/index';
import Footer from './Footer/index';
import GlobalFooter from './GlobalFooter';

ReactDOM.render(<AppBar />, document.querySelector('#app-bar'));
ReactDOM.render(<Footer />, document.querySelector('#footer'));
ReactDOM.render(<GlobalFooter />, document.querySelector('#global-footer'));