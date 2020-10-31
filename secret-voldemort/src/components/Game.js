import React from 'react';
import '../custom.css';
import { sendRequest } from '../services/request';
import { userContext } from '../user-context';
import { Piece } from './Piece';
import { Columns } from 'react-bulma-components'
import { Redirect } from 'react-router-dom';

class Game extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            room_name : this.props.room_name,
            players : {},
            timer: null
        }
    }
    static contextType = userContext;
    // uncomment when the endpoint is done.
    /*componentDidMount(){
        const headers = {
            Accept: "application/json",
            Authorization: "Bearer " + this.context.token,
            "Content-Type": "application/json"
        }
        // path for getting the game state.
        const path = "http://127.0.0.1:8000/room/get_state"
        this.state.timer = setInterval(sendRequest('GET', headers, {}, path).then(response => {
            if(!response.ok){ 
                alert ("Error al obtener datos de la partida.")
            }else{
                console.log("Accediendo al endpoint de la partida perrix")
            }
        }), 3000)
    }*/
    renderPiece(i, img){
        return (
            <Piece imgSrc ={img} value="" />
        );
    }
    render(){
        return(
            // uncomment once its connected with endpoints
            /*<userContext.Consumer>
            {({ token }) => (
              token ? */
            <div class="game-form" id='game-form'>
                <div className="game-container">
                    <h1 class="title">Partida: {this.state.room_name}</h1>
                        <div class="box align-cntr">
                                <article class="media">
                                    <div class="media-center">
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                        {this.renderPiece(0, "death")}
                                    </div>
                                    <div class="media-center">
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                        {this.renderPiece(1, "phoenix")}
                                    </div>
                                </article>
                        </div>
                        <div class="columns">
                            <div class="column">
                                First column
                            </div>
                            <div class="column">
                                Second column
                            </div>
                            <div class="column">
                                Third column
                            </div>
                            <div class="column">
                                Fourth column
                            </div>
                        </div>
                </div>
            </div>
            /*:
            <Redirect to='/'/>
            )}
            </userContext.Consumer>*/
        )
    }


} export { Game }