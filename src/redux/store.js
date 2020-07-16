import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './reducers/sessionReducer';
import dataReducer from './reducers/dataReducer';
import stackReducer from './reducers/stackReducer';
import playlistReducer from './reducers/playlistReducer';

const INITIAL_STATE = {};

const middleware = [thunk];

const reducers = combineReducers({
  session: sessionReducer,
  data: dataReducer,
  stack: stackReducer,
  playlist: playlistReducer,
})

const store = createStore(
  reducers,
  INITIAL_STATE,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);

export default store;
