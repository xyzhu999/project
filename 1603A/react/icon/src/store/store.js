import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducer/reducer';

// 引入中间件
import Logger from 'redux-logger';
import Thunk from 'redux-thunk';

export default createStore(reducers, applyMiddleware(Logger, Thunk));