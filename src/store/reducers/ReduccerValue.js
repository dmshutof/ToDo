import {GET_TASKS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    tasks: []
}


export default function TaskReducer(state=initialState, action) {

    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return{
                ...state,
                tasks: action.tasks
            }



        default:
            return state


    }
}