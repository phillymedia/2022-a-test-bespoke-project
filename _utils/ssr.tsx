import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';
import "module-alias/register";

const app = ReactDOMServer.renderToString(<App/>);
console.log(`<div id="innovation-root">${app}</div>`);
