import React, {useState} from 'react';
import TaskForm from "./TaskForm/TaskForm";
import axios from "axios";
import {GetTasks} from "../../store/actions/ActionValue";
import {connect} from "react-redux";
import SidebarForm from "./SidebarForm/SidebarForm";

function AddButton(props) {
    const [formShow, setFormShow] = useState(false);
    const [inputText, SetInputText] = useState(null);
    const [inputFolderName, SetInputFolderName] = useState(null);
    const [radioColor, SetRadioColor] = useState('gray');

    const ShowAddForm = ()=>{
        setFormShow(true)
    }

    const AddTask = (e)=>{
        e.preventDefault()
        let parentId = props.parentId

       if (!!inputText){
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
               setFormShow(false)
               SetInputText(null)

           }).catch( function(error) {
               console.log(error);
           });
       } else{

           document.querySelector('.add_form .main_input').classList.add('error')

           if (document.querySelector('.add_form .main_input').classList.contains('error')){
               document.querySelector('.add_form .main_input').classList.remove('error')
               setTimeout(()=>{
                   document.querySelector('.add_form .main_input').classList.add('error')
               },100)
           }
       }


    }

    const addFolder = (e)=>{
        e.preventDefault()

        if (!!inputFolderName){
            axios({
                method:'post',
                url: 'https://todo-36f9b.firebaseio.com/todos.json',
                data:{
                    colorClass: radioColor,
                    title: inputFolderName,
                    id: Math.floor(Math.random() * (999 - 1) + 1),
                    position: 2,
                    taskList:[
                        {
                            fake: 'qqw'
                        }
                    ]
                }
            }).then(res => {
                props.GetTasks()

            }).then(res => {
                setFormShow(false)
                SetInputFolderName(null)

            }).catch( function(error) {
                console.log(error);
            });
        } else{

            document.querySelector('.sidebar_form .main_input').classList.add('error')

            if (document.querySelector('.sidebar_form .main_input').classList.contains('error')){
                document.querySelector('.sidebar_form .main_input').classList.remove('error')
                setTimeout(()=>{
                    document.querySelector('.sidebar_form .main_input').classList.add('error')
                },100)
            }
        }


    }





    const Cancel = (e)=>{
        e.preventDefault()
        setFormShow(false)
    }

    const changeInputText = (e)=>{
        SetInputText(e.target.value)
    }
    const changeInputFolderName = (e)=>{
        SetInputFolderName(e.target.value)
    }

    const changeRadioColor = (e)=>{
        SetRadioColor(e.target.value)
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
                            cancel={Cancel}
                            changeInputText={changeInputText}
                        />
                        : null

                :
                        formShow?
                            <SidebarForm
                                addFolder={addFolder}
                                changeInputFolderName={changeInputFolderName}
                                cancel={Cancel}
                                changeRadioColor={changeRadioColor}
                            />
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
