import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk  from 'redux-thunk'
import {Provider} from 'react-redux'
import Routers from './router/router'
import reducers from './redux/reducers'
import './index.scss'
import Promise from 'promise-polyfill';
// To add to window  解决promise 在ie中未定义的问题
if (!window.Promise) {
    window.Promise = Promise;
}
const store =createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
    )
);
//react-redux优化
ReactDom.render(
    (
        <Provider store={store}>
            <Routers/>
        </Provider> ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/*serviceWorker.unregister();*/
