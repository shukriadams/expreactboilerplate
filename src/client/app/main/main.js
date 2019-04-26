import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux'
import Default from './../default/default';
import Store from './../store/store'

const history = createBrowserHistory();

(async function(){
    ReactDOM.render(
        <Router history={history}>
            <Provider store={Store}>
                <Switch>
                    <Route exact path="/" component={Default} />
                </Switch>
            </Provider>
        </Router>,
        document.getElementById('reactHook')
    );
}())