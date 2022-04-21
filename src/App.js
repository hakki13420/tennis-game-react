import React,{useEffect, useState} from 'react'
import "./App.css"


function App(){
    const initialState={
        winner:null,
        player1:0,
        player2:0,
        play:true,
        reset:false,
        avantage:null,
        playAuto:false,
        player1WinCount:0,
        player2WinCount:0,
        player1LossCount:0,
        player2LossCount:0,
        player1AvgCount:0,
        player2AvgCount:0,
    }

    const array=[
        'player1',
        'player2'
    ]
    const [state,setState]=useState(initialState);
    const timer= React.useRef(null)
    
    function evaluatePlayer1(state){        
        if(state.player1<30){
            setState((stateP)=>{return {...stateP,player1:stateP.player1+15}})
        }else if(state.player1>=30 && state.player1<40) {
            setState((stateP)=>{return {...stateP,player1:stateP.player1+10}})
        }else if(state.player1===40 && state.player2<40){
            setState((stateP)=>{
                return {...stateP,winner:"player1",
                        player1WinCount:stateP.player1WinCount+1,
                        player2LossCount:stateP.player2LossCount+1,                        
                    }
            })
        }else if(state.player1===40 && state.player2===40 && state.avantage==="player1"){
            setState((stateP)=>{
                return {...stateP,winner:"player1",
                        player1WinCount:stateP.player1WinCount+1,
                        player2LossCount:stateP.player2LossCount+1,
                    }
            })
        }else if(state.player1===40 && state.player2===40 && state.avantage==="player2"){
            setState((stateP)=>{
                return {...stateP,
                        avantage:"player1",
                        player1AvgCount:stateP.player1AvgCount+1,
                    }
            })
        }else if(state.player1===40 && state.player2===40 && !state.avantage){
            setState((stateP)=>{
                return {...stateP,
                        avantage:"player1",
                        player1AvgCount:stateP.player1AvgCount+1,
                }
            })
        }
    }

    function evaluatePlayer2(state){        
        if(state.player2<30){
            setState((stateP)=>{return {...stateP,player2:stateP.player2+15}})
        }else if(state.player2>=30 && state.player2<40) {
            setState((stateP)=>{return {...stateP,player2:stateP.player2+10}})
        }else if(state.player2===40 && state.player1<40){
            setState((stateP)=>{
                return {...stateP,
                        winner:"player2",
                        player2WinCount:stateP.player2WinCount+1,
                        player1LossCount:stateP.player1LossCount+1,
                    }
            })
        }else if(state.player2===40 && state.player1===40 && state.avantage==="player2"){
            setState((stateP)=>{
                return {...stateP,
                        winner:"player2",
                        player2WinCount:stateP.player2WinCount+1,
                        player1LossCount:stateP.player1LossCount+1,
                    }
            })
        }else if(state.player2===40 && state.player1===40 && state.avantage==="player1"){
            setState((stateP)=>{
                return {...stateP,
                        avanatage:"player2",
                        player2AvgCount:stateP.player2AvgCount+1,
                    }
            })
        }else if(state.player2===40 && state.player1===40 && !state.avantage){
            setState((stateP)=>{
                return {...stateP,
                        avantage:"player2",
                        player2AvgCount:stateP.player2AvgCount+1,
                    }
            })
        }
    }

    function handelPlayer(event){
        if(state.play){
            if(event.target.name==="player1"){
                evaluatePlayer1(state)
            }            
            else{
                evaluatePlayer2(state)
            }
        }
    }

    function reset(){
        setState({  ...state,
                    winner:null,
                    player1:0,
                    player2:0,
                    play:true,
                    playAuto:false,
                    reset:false,
                    avantage:null
                })
    }

    function pauseGame(){
        setState({...state,play:!state.play})
    }
    
    function autoPlay(){        
        
            let player=array[Math.round(Math.random())]
            if(player==="player1") {
                evaluatePlayer1(state)
            }else if(player==="player2"){
                evaluatePlayer2(state)
            }                        
    }        

    useEffect(() => {
        setTimeout(() => {            
            if(state.playAuto) autoPlay()
        }, 1000);
    }, [state.player1,state.player2, state.playAuto])
    

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
                        onClick={handelPlayer}
                >
                    player1
                </button>
                <button className="btn btn-player"
                        name="player2"
                        onClick={handelPlayer}
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
                        onClick={pauseGame}
                >
                    Pause
                </button>
            </div>
            <div className="playAuto">
                <button className="btn btn-auto"
                        onClick={()=>setState({...state,playAuto:!state.playAuto})}
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