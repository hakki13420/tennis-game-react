//initial state
const initialState={
    winner:null,
    player1:0,
    player2:0,
    play:false,
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
const resetGame={
    winner:null,
    player1:0,
    player2:0,
    play:false,
    reset:false,
    avantage:null,
    playAuto:false,    
}

const array=[
    'player1',
    'player2'
]
// type actions
const RESET="RESET";
const PLAYING="PLAYING";
const EVALUATE="EVALUATE";
const AUTOPLAY="AUTOPLAY";

//actions
export const resetAction=()=>{
    return{
        type:RESET,
        payload:resetGame
    }
}
export const playingAction=()=>{
    return{
        type:PLAYING
    }
}
export const evaluateAction=(player)=>{
    return{
        type:EVALUATE,
        payload:player
    }
}
export const autoPlayAction=()=>{
    return{
        type:AUTOPLAY,        
    }
}


//reducer
const playerReducer=(state=initialState,action)=>{
    switch(action.type){
        case RESET :{
            return {...state,
                    ...action.payload
                };
        }
        case PLAYING :{
            return {
                ...state,
                play:!state.play
            }
        }
        case EVALUATE :{
            if(!state.winner){
                if(action.payload==="player1"){
                    return evaluatePlayer1(state)
                }else{
                    return evaluatePlayer2(state);
                }            
            }else return state            
        }
        case AUTOPLAY :{
            return autoPlay(state)          
        }
        default: return state;                
    }
}

//=======================helper functions================

function evaluatePlayer1(state){        
    if(state.player1<30){
        return {...state,player1:state.player1+15}
    }else if(state.player1>=30 && state.player1<40) {
        return {...state,player1:state.player1+10}
    }else if(state.player1===40 && state.player2<40){        
            return {...state,winner:"player1",
                    player1WinCount:state.player1WinCount+1,
                    player2LossCount:state.player2LossCount+1,                        
                }        
    }else if(state.player1===40 && state.player2===40 && state.avantage==="player1"){        
            return {...state,winner:"player1",
                    player1WinCount:state.player1WinCount+1,
                    player2LossCount:state.player2LossCount+1,
                }    
    }else if(state.player1===40 && state.player2===40 && state.avantage==="player2"){        
            return {...state,
                    avantage:"player1",
                    player1AvgCount:state.player1AvgCount+1,
                }    
    }else if(state.player1===40 && state.player2===40 && !state.avantage){        
            return {...state,
                    avantage:"player1",
                    player1AvgCount:state.player1AvgCount+1,
            }    
    }
}

function evaluatePlayer2(state){        
    if(state.player2<30){
        return {...state,player2:state.player2+15}
    }else if(state.player2>=30 && state.player2<40) {
        return {...state,player2:state.player2+10}
    }else if(state.player2===40 && state.player1<40){        
            return {...state,
                    winner:"player2",
                    player2WinCount:state.player2WinCount+1,
                    player1LossCount:state.player1LossCount+1,
                }        
    }else if(state.player2===40 && state.player1===40 && state.avantage==="player2"){        
            return {...state,
                    winner:"player2",
                    player2WinCount:state.player2WinCount+1,
                    player1LossCount:state.player1LossCount+1,
                }        
    }else if(state.player2===40 && state.player1===40 && state.avantage==="player1"){        
            return {...state,
                    avanatage:"player2",
                    player2AvgCount:state.player2AvgCount+1,
                }    
    }else if(state.player2===40 && state.player1===40 && !state.avantage){        
            return {...state,
                    avantage:"player2",
                    player2AvgCount:state.player2AvgCount+1,
                }    
    }
}

function autoPlay(state){        
        
    let player=array[Math.round(Math.random())]
    if(player==="player1") {
        return evaluatePlayer1(state)
    }else if(player==="player2"){
        return evaluatePlayer2(state)
    }                        
}        

//========================end helper function======

export default playerReducer;