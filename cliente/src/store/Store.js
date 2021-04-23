import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import postsReducer from './PostReducer';
import AuthReducer from './AuthReducer'

const rootReducer = combineReducers({
    Posts: postsReducer,
    Auth: AuthReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;