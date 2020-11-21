import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers/index'

const preLoadState = {}
const middleware = [thunk]

const store = createStore(rootReducer, preLoadState, compose(applyMiddleware(...middleware)))

export default store;