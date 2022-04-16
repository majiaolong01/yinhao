import React from 'react';
import ReactDOM from 'react-dom/client'
import Routers from './router/router'
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk  from 'redux-thunk'
import {Provider} from 'react-redux'
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <Routers/>
  </Provider>
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
