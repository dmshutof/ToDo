import React, {useEffect, useState} from 'react';

import CheckBoxItem from "./CheckBoxItem/CheckBoxItem";
import AddButton from "../AddButton/AddButton";

function ToDoTaskItem(props) {

    const [taskListDB, setTaskListDB] = useState([]);



    const taskToState = () => {

           const jsonString = JSON.parse(JSON.stringify(props.taskList));
           const taskList =[];

           Object.keys(props.taskList).forEach((key,index)=>{
               taskList.push({
                   taskItem:jsonString[key],
                   id: index,
                   taskKey: key
               })
           });
          /* setTaskListDB(taskList)*/
        console.log('taskToState()',  props.taskList)

    }
    useEffect(
        ()=>{
            taskToState()
        },[]

    )




    return (

        <div className="todo__tasks-item">
            <h1 className={'item_title ' + props.colorClass} title={props.title}>{props.title}</h1>


            {

                taskListDB.map((task, index) =>{
                   // console.log('ToDoTaskItem.js(taskListDB)',taskListDB )
                    return(
                        <CheckBoxItem
                            key={index}
                            parentId={props.id}
                            id={task.taskKey}
                            name={task.taskItem.name}
                            checked={task.taskItem.checked}
                            taskToState={taskToState}
                        />
                    )
                })
            }

            {
                props.showAdd ?
                        <AddButton
                            taskListDB={taskListDB}
                            name={'Новая задача'}
                            parentId={props.id}
                            formItem={true}/* true - добавление задачи, false - добавление папки */
                            taskToState={taskToState}
                        />
                     : null
            }


        </div>


    );
}

export default ToDoTaskItem;
