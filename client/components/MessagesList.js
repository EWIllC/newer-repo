import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store from '../store'
import {  connect } from 'react-redux'
import { fetchMessages } from '../store'

class MessagesList extends Component {

  constructor (props) {
    super(props);
    this.state =  {
      messages: []
    };
    //console.log(this.state)
  }

  componentDidMount () {
    this.props.fetchInitialMessage()
    
    
  }

  render () {
    //console.log(this.props)
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    const filteredMessages = messages.filter(message => message.channelId === channelId);

    return (
      <div>
        <ul className="media-list">
          { filteredMessages.map(message => <Message message={message} key={message.id} />) }
        </ul>
        <NewMessageEntry />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     fetchInitialMessage: () => dispatch(fetchMessages())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessagesList)

