//@--import middlewares
import {combineReducers} from 'redux'

//@--import reducers
import authReducers from './authReducers'
import errorReducers from './errorReducers'
//@--combine all reducers

export default combineReducers({
    auth: authReducers,
    error: errorReducers
})
