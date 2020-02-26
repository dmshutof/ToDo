import axios from 'axios'
import {GET_TASKS_SUCCESS} from "../actions/actionTypes";




export function GetTasks() {
    return async dispatch =>{
        try {
            axios
                .get('https://todo-36f9b.firebaseio.com/todos.json')
                .then(( data )=>{

                    const jsonString = JSON.parse(JSON.stringify(data.data));
                    const tasks =[];

                    Object.keys(data.data).forEach((key,index)=>{

                        tasks.push({
                            taskItem:jsonString[key],
                            id: index,
                            taskKey: key
                        })
                    });
                    dispatch(GetTasksSuccess(tasks))//диспатчим список из бд

                })


        }catch(e){
            console.log(e)

        }
    }

}

export function GetTasksSuccess(tasks) {

    return{
        type: GET_TASKS_SUCCESS,
        tasks: tasks
    }

}


