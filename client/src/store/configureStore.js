import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import api from './api/reducer';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    // eslint-disable-next-line no-underscore-dangle
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (history) => {
  const reducer = combineReducers({
    api,
    routing: routerReducer,
    form: formReducer,
  });

  const routingMiddleware = routerMiddleware(history);

  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(
      routingMiddleware,
      thunkMiddleware,
    )),
  );

  return store;
};
