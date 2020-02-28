import axios from 'axios'
import {GET_TASKS_SUCCESS} from "../actions/actionTypes";

export function GetTasks() {
    return async dispatch => {
        try {
            axios
                .get('https://todo-36f9b.firebaseio.com/todos.json')
                .then((response) => {
                    const taskCollection = [];
                    Object.keys(response.data).forEach((key, index) => {
                        let task = {
                            id: index,
                            taskKey: key,
                            taskItem: response.data[key],
                            colorClass:response.data[key].colorClass
                        };
                        taskCollection.push(task);
                    });

                   let taskCollectionFilter  = taskCollection.filter(function (item) {
                        return item.taskKey !== "0909";
                    });

                    dispatch(GetTasksSuccess(taskCollectionFilter))//диспатчим список из бд
                })
        } catch (e) {
            console.log(e)
        }
    }
}

export function GetTasksSuccess(tasks) {
    return {
        type: GET_TASKS_SUCCESS,
        tasks: tasks
    }
}