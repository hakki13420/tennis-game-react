import {createStore} from 'redux'
import playerReducer from './playerReducer'


const store = createStore(playerReducer)
export default store