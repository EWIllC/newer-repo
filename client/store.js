import Axios from 'axios';
import { createStore, } from 'redux'
import thunkMiddleware from 'redux-thunk'
import {applyMiddleware} from 'redux'
import MessagesList from './components/MessagesList';


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const initialState = {
    messages: []
}

export const fetchMessages = () => {
    return async (dispatch) => {
        const response = await Axios.get('/api/messages')
        const messages = response.data;
        
        dispatch(gotMessagesFromServer(messages))
    }
}

export const gotMessagesFromServer = (messages) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages
    }
}

export const reducer = (state = initialState, action) => {
    //console.log(action)
    switch(action.type) {
        case GOT_MESSAGES_FROM_SERVER: 
            return {...state, messages: action.messages}
        default: 
            return state  
    }
}




const store = createStore(reducer,applyMiddleware(thunkMiddleware));
export  default store;