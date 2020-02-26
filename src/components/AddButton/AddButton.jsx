import React, {useState} from 'react';
import TaskForm from "./TaskForm/TaskForm";
import axios from "axios";
import {GetTasks} from "../../store/actions/ActionValue";
import {connect} from "react-redux";

function AddButton(props) {
    const [formShow, setFormShow] = useState(false);
    const [inputText, SetInputText] = useState(null);

    const ShowAddForm = ()=>{
        setFormShow(true)
    }

    const AddTask = (e)=>{
        e.preventDefault()
        let parentId = props.parentId

        axios({
            method:'post',
            url: 'https://todo-36f9b.firebaseio.com/todos/' + parentId+ '/taskList.json',
            data:{
                checked: false,
                name: inputText,
                task_id: Math.floor(Math.random() * (999 - 1) + 1)
            }
        }).then(res => {
            props.GetTasks()

        }).then(res => {
           setTimeout(()=>{
               props.taskToState()
           },5000)
            setFormShow(false)
            SetInputText(null)

        }).catch( function(error) {
            console.log(error);
        });


    }

    const Сancel = (e)=>{
        e.preventDefault()
        setFormShow(false)
    }

    const changeInputText = (e)=>{
        SetInputText(e.target.value)
    }


    return (
        <div className="add_button_wrap">
            {
                props.formItem? (
                            !formShow?
                                <div className="todo__sidebar-item todo__sidebar-item--add" onClick={ShowAddForm} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 1V11"/>
                                        <path d="M1 6H11"/>
                                    </svg>
                                    <p>{props.name}</p>
                                </div>: null
                ):
                    (
                        <div className="todo__sidebar-item todo__sidebar-item--add" onClick={ShowAddForm} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none">
                                <path d="M6 1V11"/>
                                <path d="M1 6H11"/>
                            </svg>
                            <p>{props.name}</p>
                        </div>
                    )

            }

            {
                props.formItem ?

                        formShow?
                        <TaskForm
                            addTask={AddTask}
                            cancel={Сancel}
                            changeInputText={changeInputText}
                        />
                        : null

                :
                        formShow?
                            'SidebarForm'
                        : null
            }
        </div>

    );
}


function mapStateToProps(state) {
    return {
        tasksDBRedux: state.tasks.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return {
        GetTasks: () => dispatch(GetTasks())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddButton);
