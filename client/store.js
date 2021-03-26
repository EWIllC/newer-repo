import Axios from 'axios';
import { createStore, } from 'redux'
import { thunkMiddleware, applyMiddleware, connect } from 'redux-thunk'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const initialState = {
    msg: []
}

const fetchMessage = () => {
    return async (dispatch) => {
        const response = await Axios.get('/api/messages')
        console.log(response)
        const messages = response.data;
        const action = gotMessagesFromServer(messages)
        dispatch(action)
    }
}

export const gotMessagesFromServer = (msg) => {
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        msg
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GOT_MESSAGES_FROM_SERVER: 
            return {...state, msg: action.msg}
        default: 
            return state  
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = () => {
    return fetchInitialMessages = (dispatch) => {
        dispatch(fetchMessage())
    }
}

const store = createStore(reducer);
export default store;