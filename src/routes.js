// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import Discuss from './components/Discuss';
import Explore from './components/Explore';
import Game from './components/Game';
import NotFound from './components/NotFound';

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={App} />
        <Route path="/discuss" component={Discuss} />
        <Route path="/explore" component={Explore} />
        <Route path="/game" component={Game} />
        <Route path="*" component={NotFound} />
    </Router>
);

export default Routes;