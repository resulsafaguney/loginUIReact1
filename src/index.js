import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Login /> ,document.getElementById('root'));

serviceWorker.unregister();
