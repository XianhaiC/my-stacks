import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
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
});

let composeArgs = [
  applyMiddleware(...middleware),
]

if (process.env.REACT_APP_DEBUG_REDUX !== false)
  composeArgs.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )

const store = createStore(
  reducers,
  INITIAL_STATE,
  compose(...composeArgs),
);

export default store;
