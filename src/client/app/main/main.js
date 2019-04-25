import Default from './../default/default';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Switch, Route, Link } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Store from './../store/store'
import { Provider } from 'react-redux'
import { populateList } from './../actions/list';
import socketInitialize from './../helpers/socket';

let history = createBrowserHistory();

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
    
    socketInitialize();

    // do starting data fetches here
    await populateList()
}())