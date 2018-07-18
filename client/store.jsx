import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const store = createStore(reducer, applyMiddleware(createLogger(), thunkMiddleware));

export default store;
