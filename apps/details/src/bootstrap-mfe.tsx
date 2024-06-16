import * as ReactDOM from 'react-dom';

import App from './app/app';
import React from 'react';

class Mfe4Element extends HTMLElement {
  connectedCallback() {
    console.log('http-mfe-react-element connectedCallback from DOM');

    window.React = React;
    ReactDOM.render(<App />, this);
  }

  disconnectedCallback() {
    console.log('http-mfe-react-element disconnectedCallback from DOM');
  }
}

customElements.define('mfe-react-details', Mfe4Element);
