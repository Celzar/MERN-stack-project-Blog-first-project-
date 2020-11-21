import { GET_ERRORS } from '../type/types';

const initialState = {};

export default (state = initialState, action)=>{
    switch(action.type){
        case GET_ERRORS:
            return action.payload;
        default:
            return state; 
    }
}