import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {    resetAction, 
            playingAction, 
            evaluateAction,
            autoPlayAction } from './store/playerReducer';
import "./App.css"


function App(){



    //const [state,setState]=useState(initialState);
    //const timer= React.useRef(null)
    const dispatch=useDispatch();
    const state= useSelector(state=>state)
    

    
    function reset(){
        dispatch(resetAction())
    }
    function autoPlay(){
        dispatch(autoPlayAction())
        setTimeout(() => {
            if(!state.winner) autoPlay()
        },2000);
    }
   

    return (
        <div className="game">
            <div className="winner">
                <p>
                    {
                        state.winner?state.winner+' win'
                        :state.avantage?state.avantage+' has avantage':""                        
                    }
     
                </p>
            </div>
            <div className="score">
                <p>
                le score est : {state.player1} - {state.player2}
                </p>
            </div>
            <div className="players">
                <button className="btn btn-player"
                        name="player1"
                        onClick={()=>dispatch(evaluateAction('player1'))}
                >
                    player1
                </button>
                <button className="btn btn-player"
                        name="player2"
                        onClick={()=>dispatch(evaluateAction("player2"))}
                >
                    player2
                </button>
            </div>
            <div className="options">
                <button className="btn btn-option"
                        onClick={reset}
                >
                    reset
                </button>
                <button className="btn btn-option"
                        onClick={()=>dispatch(playingAction())}
                >
                    {
                        state.play?"Pause":"Play"
                    }
                </button>
            </div>
            <div className="playAuto">
                <button className="btn btn-auto"
                        onClick={autoPlay}
                >
                    Play Auto
                </button>
            </div>
            <div className="statistics">
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>players</th>
                        <th>win</th>
                        <th>loss</th>
                        <th>Avantages</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Player1</td>
                    <td>{state.player1WinCount}</td>
                    <td>{state.player1LossCount}</td>
                    <td>{state.player1AvgCount}</td>
                    <td>
                        {state.player1WinCount+state.player1LossCount}
                    </td>
                </tr>
                <tr>
                    <td>Player2</td>
                    <td>{state.player2WinCount}</td>
                    <td>{state.player2LossCount}</td>
                    <td>{state.player2AvgCount}</td>
                    <td>
                        {state.player2WinCount+state.player2LossCount}
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default App;