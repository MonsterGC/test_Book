import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import App from './components/App/App';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ErrorPage from './pages/Errorpage/ErrorPage';

class Routes extends React.Component {
    render() {
        return (
            <Router >
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;