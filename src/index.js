//Import bootstrap first so we don't overwrite our own styles
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory} from 'react-router';

//Import all of our components to configure react-router
import { Router, Route, IndexRoute } from 'react-router';
import Home from './components/Home';
import Discuss from './components/Discuss';
import Explore from './components/Explore';
import Game from './components/Game';
import UserAccount from './components/UserAccount';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import NotFound from './components/NotFound';
import Main from './components/Main';

const Routes = (props) => (
    <Router {...props}>
		<Route path="/" component={Main}>
			<Route path="/discuss" component={Discuss} />
			<Route path="/explore" component={Explore} />
			<Route path="/game" component={Game} />
			<Route path="/account" component={UserAccount} />
			<Route path="/login" component={UserLogin} />
			<Route path="/register" component={UserRegister} />
			<Route path="*" component={NotFound} />
			<IndexRoute component={Home}></IndexRoute>
		</Route>
		
    </Router>
);

//Entry point to our app via react-router
ReactDOM.render(
    <Routes history={browserHistory} />,
    document.getElementById('root')
);