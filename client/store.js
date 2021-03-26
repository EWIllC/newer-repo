import Axios from 'axios';
import { createStore, } from 'redux'
import {  connect } from 'react-redux'
import thunk from 'redux-thunk'
import {applyMiddleware} from 'redux'
import MessagesList from './components/MessagesList';


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const initialState = {
    messages: []
}

const fetchMessage = () => {
    return async (dispatch) => {
        const response = await Axios.get('/api/messages')
        console.log(response)
        const messages = response.data;
        console.log(`mesasges from store`, mesasges )
        const action = gotMessagesFromServer(messages)
        //dispatch(action)
    }
}

export const gotMessagesFromServer = (messages) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_MESSAGES_FROM_SERVER: 
            return {...state, messages: action.messages}
        default: 
            return state  
    }
}

const mapStateToProps = (state) => {
    return {
       messages: state.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return 
       fetchInitialMessages: () => dispatch(fetchMessage())
}

  const ConnectCounter = connect(mapStateToProps,mapDispatchToProps)(MessagesList )
const store = createStore(reducer,applyMiddleware());
export  default store;