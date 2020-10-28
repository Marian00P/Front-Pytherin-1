import React from 'react';
import { sendRequest } from '../services/request';
import { Redirect } from 'react-router-dom';
import { userContext } from '../user-context';
import Button from './Button'

/* This component is in charge of collecting the 
data entered by the user and sending it to the corresponding endpoint. */

class CreateRoom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      room_name: '',
      room_max_players: 5,
      redirect: false,
      redirectPath: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMaxPlayers = this.handleChangeMaxPlayers.bind(this);
    this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
    this.join_room = this.join_room.bind(this);
  }

  static contextType = userContext;

  // methods
  join_room(headers){
    // the consts below is for joining the room after its creation.
    const join_params = `{ 
      "room_name": "${this.state.room_name}"
    }`
    // send request for joining the room
    sendRequest("POST", headers, join_params, "http://127.0.0.1:8000/room/join_room")
    .then(async response => {
      const snd_data = await response.json()
      if(!response.ok){
        return(
          alert(snd_data.detail)
        )
      }else {
        this.setState({redirect: true, redirectPath: "/lobbyRoom"})
      }
      
    })
    .catch(error => {
      console.error("There was an error", error) 
    })
    // end join request
 }
  handleSubmit(e) {
    e.preventDefault()
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.context.token,
      "Content-Type": "application/json"
    }
    const keys = `{
              "name": "${this.state.room_name}",
              "max_players": "${this.state.room_max_players}"
            }`    
    if (this.state.room_max_players && this.state.room_name) {

      sendRequest("POST", headers, keys, "http://127.0.0.1:8000/room/new")
        .then(async response => {
          const data = await response.json();

          if(!response.ok) {
            const error = (data && data.message) || response.status;
            return(
              alert(data.detail)
            )
          }else {
            this.join_room(headers)
          } 
        })
        .catch(error => {
          console.error('There was an error', error);
        })

    } else {
      alert('Please fill in all fields correctly.')
    }
  }
  
  handleChangeMaxPlayers(event) {
    const value = event.target.value;
    this.setState({
      room_max_players: value
    })
  }

  handleChangeRoomName(event) {
    let value = event.target.value;
    value = value.replace(/[^A-Za-z1-9]/gi, "");
    
    this.setState({
      room_name: value
    })
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={this.state.redirectPath} room_name={ this.state.room_name}/>);
    } else {
      return (
        <userContext.Consumer>
        {({token, setToken}) => (
          token ? 
          <div className="FormCreateRoom">
              <h2>Creation of room</h2>
              <form name="form" onSubmit={this.handleSubmit}>
                  <div className="Room_name">
                      <label>Room name <br/>
                        <input type="text" maxLength='30' minLength='6'
                          value={this.state.room_name} min='5' max='10'
                          onChange={this.handleChangeRoomName} name="roomName"/>
                      </label> <br/>
                  </div>
                  <div className="Max_Players">
                      <label>Maximum number of players <br/>
                        <input type="number" value={this.state.room_max_players} 
                          min='5' max='10' onChange={this.handleChangeMaxPlayers} 
                          name="maxPlayers" />
                      </label> <br/>
                  </div> <br/>
                  <input type='submit' value='Create room'/>
                  <Button path="/home" text="Cancel"></Button>
              </form>
          </div>
          :
          <Redirect to='/'/>
        )}
        </userContext.Consumer>
      )
    }
  }
} export default CreateRoom;