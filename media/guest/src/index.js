import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store"
import AppLayout from "./pages/AppLayout";
import './index.css';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppLayout></AppLayout>
        </div>
    </Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();