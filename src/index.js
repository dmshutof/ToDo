import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/reset.css';
import './assets/scss/index.scss';
import './assets/scss/media.scss';

import App from './App';
import {createStore, compose, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from "./store/reducers/rootReducer";
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;


const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

const app = (
    <Provider store={store}>

        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
