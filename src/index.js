/** 
 * @file this is the entry point to our react app.
 * We import all of the components used in routing, 
 * define our routes, and call ReactDOM to render the view.
 */

//Import bootstrap first so we don't overwrite our own styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory} from 'react-router';

//Import all of our components to configure react-router
import { Router, Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import Discuss from './components/Discuss/index';
import Categories from './components/Discuss/categories'
import Explore from './components/Explore';
import Game from './components/Game';
import UserLogin from './components/Discuss/login';
import UserRegister from './components/Discuss/register';
import NotFound from './components/NotFound';
import Main from './components/Main';

const Routes = (props) => (
    <Router {...props}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home}></IndexRoute>
			<Route path="/discuss" component={Discuss}>
                <IndexRoute component={Categories} />
                <Route path="/login" component={UserLogin} />
			    <Route path="/register" component={UserRegister} />
            </Route>
			<Route path="/explore" component={Explore} />
			<Route path="/game" component={Game} />
			<Route path="*" component={NotFound} />
		</Route>
    </Router>
);

//Entry point to our app via react-router
ReactDOM.render(
    <Routes history={browserHistory} />,
    document.getElementById('root')
);