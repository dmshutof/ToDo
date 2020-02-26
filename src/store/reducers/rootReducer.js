import {combineReducers} from 'redux'
import TaskReducer from "./ReduccerValue";

export default combineReducers({
    tasks: TaskReducer
})