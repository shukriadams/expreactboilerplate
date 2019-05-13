import { View as Default } from './../default/default';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route, Link } from 'react-router-dom'
import history from './../helpers/history';
import Store from './../store/store'
import { Provider } from 'react-redux'
import { populateList } from './../actions/list';
import socketInitialize from './../helpers/socket';
import { Layout } from './../layout/layout';
import listWatcher from './../store/watchers/list'; // importing watcher will start it

(async function(){
    ReactDOM.render(
        <Router history={history}>
            <Provider store={Store}>
                <Switch>
                    <Layout>
                        <Route exact path="/" component={Default} />
                    </Layout>
                </Switch>
            </Provider>
        </Router>,
        document.getElementById('reactHook')
    );
    
    socketInitialize();

    // do starting data fetches here
    await populateList()
}())
